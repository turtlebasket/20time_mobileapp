import AsyncStorage from '@react-native-async-storage/async-storage'
import { useScrollToTop } from '@react-navigation/native';
import { Value } from 'react-native-reanimated';

/* --------------------------------------------------------
 *              LOCAL STORAGE HELPERS - TODO
 * --------------------------------------------------------
 */

/**
 * Get all users, (both current and everyone else)
 * @return users list object
 */
export async function getAllUsers() {
  const users = await AsyncStorage.getItem('users');
  return users != null ? JSON.parse(users) : null;
}

/**
 * Get current user ID
 * @return ID for currentUser
 */
export async function getCurrentUserId() { 
  const userId = await AsyncStorage.getItem('currentUser');
  return userId;
}

/**
 * Get current user object
 * @return user object for CURRENT user
 */
export async function getCurrentUser() { 
  const userId = await AsyncStorage.getItem('currentUser');
  const usersStr = await AsyncStorage.getItem('users');
  if (usersStr === null || userId == null) return
  const users = JSON.parse(usersStr);
  const currentUser = getByGuid(users, userId)
  return currentUser;
}

/**
 * Sets current user to given ID.
 * @param userId new currentUser ID
 */
export async function setCurrentUserById(userId: string) {
  await AsyncStorage.setItem('currentUser', userId);
}

/**
 * Set ANY user object in storage
 * @param user User object
 */
export async function setUser(user: any) {
  var users = await getAllUsers();
  setByGuid(users, user)
  await AsyncStorage.setItem('users', JSON.stringify(users));
}

/**
 * Gets all Todo Lists of current user
 * @return Every todo list of current user
 */
export async function getTodoLists() { 
  const user = await getCurrentUser();
  return user.todoLists ? user.todoLists : [];
}

/**
 * Get Todo List of current user
 * @return one todo list of CURRENT user specified by ID
 */ 
export async function getTodoList(id: string) { 
  const user = await getCurrentUser();
  return getByGuid(user.todoLists, id);
}

/**
 * Get TodoItem at given GUID
 * @param listId GUID of parent TodoList
 * @param todoId GUID of target TodoItem
 * @returns TodoItem object at given GUID
 */
export async function getTodoItem(listId: string, todoId: string) {
  const user = await getCurrentUser();
  const currTodoList = await getByGuid(user.todoLists, listId);
  // console.log(`TODOITEMS ${JSON.stringify(currTodoList.todoItems)}`)
  const todoItem = await getByGuid(currTodoList.todoItems, todoId);
  // console.log(`TODOITEM ${JSON.stringify(todoItem)}`)
  return todoItem;
}

/**
 * Set todoLists of a user. USE WITH CAUTION, THIS OVERWRITES EVERYTHING!
 * @param todoLists new todoLists object
 */
export async function setTodoLists(todoLists: any[]) {
  const user = await getCurrentUser();
  user.todoLists = todoLists;
  setUser(user) 
}

/**
 * Set TodoList of current user
 * @param todoList TodoList object 
 */
export async function setTodoList(todoList: any) {
  const user = await getCurrentUser();
  // var targetTodoListOld = {};
  // getTodoLists().then(val => {targetTodoListOld = getByGuid(user.todoLists, todoList.id)})
  user.todoLists = setByGuid(user.todoLists, todoList)
  setUser(user);
}

/**
 * Removes the TodoList of a given GUID.
 * @param listId GUID of list to be deleted
 */
export async function removeTodoList(listId: string) {
  const user = await getCurrentUser();
  const todoListsNew = removeByGuid(user.todoLists, listId);
  user.todoLists = todoListsNew;
  setUser(user);
}

/**
 * Add OR unshift todo item to CURRENT user's todolist by todolist ID
 * @param listId ID of target todo list
 * @param todo todo object to be inserted/overwritten
 * @param end insert at end? (else beginning)
 */
export async function setTodoItem(listId: string, todo: any, end:boolean=false) {
  var user = await getCurrentUser();
  const todoList = getByGuid(user.todoLists, listId);
  if (todoList == null) return
  var completeOld: boolean;
  try {
    completeOld = getByGuid(todoList.todoItems, todo.id).complete;
  } catch {
    completeOld = false;
  }
  todoList.todoItems = setByGuid(todoList.todoItems, todo, end=end);

  // IF TODO NEWLY COMPLETED, MOVE DOWN TO "TOP OF BOTTOM"
  if (todo.complete == true && completeOld == false) {
    const currIndex: number = todoList.todoItems.findIndex((obj: any) => {
      return obj.id === todo.id;
    })
    for (let i = currIndex+1; i < todoList.todoItems.length; i++) {
      if (todoList.todoItems[i].complete) {
        // https://stackoverflow.com/a/7180095/9096067
        todoList.todoItems.splice(i-1, 0, todoList.todoItems.splice(currIndex, 1)[0])
        break;
      }
      else if (i == todoList.todoItems.length-1 && !todoList.todoItems[i].complete) {
        todoList.todoItems.splice(i, 0, todoList.todoItems.splice(currIndex, 1)[0])
        break;
      }
    }
  }

  // IF TODO NEWLY UN-COMPLETED, MOVE TO TOP
  else if (todo.complete == false && completeOld == true) {
    const currIndex: number = todoList.todoItems.findIndex((obj: any) => {
      return obj.id === todo.id;
    })
    // https://stackoverflow.com/a/7180095/9096067
    todoList.todoItems.splice(0, 0, todoList.todoItems.splice(currIndex, 1)[0])
  }

  setUser(user);
}

/**
 * Clear all completed todoItems from a list.
 * @param listId ID of target list
 */
export async function clearSelectedTodos(listId: string) {
  var user = await getCurrentUser();
  var todoList = getByGuid(user.todoLists, listId);
  var todoItems = todoList.todoItems;
  console.log(`TODOITEMS ${JSON.stringify(todoItems)}`)
  for (let i = todoItems.length-1; i >= 0; i--) {
    console.log(todoItems[i]);
    if (todoItems[i].complete) {
      console.log("COMPLETED")
      todoItems.splice(i, 1);
    }
  }
  console.log(`TODOITEMS ${JSON.stringify(todoItems)}`)
  setUser(user);
}

/**
 * Removes the TodoItem of a given GUID.
 * @param listId GUID of item to be deleted
 */
export async function removeTodoItem(listId: string, todoId: string) {
  var user = await getCurrentUser();
  const todoList = getByGuid(user.todoLists, listId);
  if (todoList == null) return
  todoList.todoItems = removeByGuid(todoList.todoItems, todoId);
  setUser(user)
}

/* --------------------------------------------------------
 *              LOCAL STORAGE HELPERS - HABIT
 * --------------------------------------------------------
 */

/**
 * Get list of habits
 * @returns List of habit objects
 */
export async function getHabitList() {
  const user = await getCurrentUser();
  return user.habits;
}

export async function getHabit(id: string) {
  const habits = await getHabitList();
  const habit = getByGuid(habits, id);
  return habit;
}

/**
 * Get list of habit objects. USE SPARINGLY.
 * @param habits New list of habit objects
 */
export async function setHabitList(habits: any) {
  var user = await getCurrentUser();
  user.habits = habits;
  await setUser(user);
}

/**
 * Set a habit object.
 * @param habit Habit object to be set
 */
export async function setHabit(habit: any) {
  var habits = await getHabitList();
  const habitsNew = setByGuid(habits, habit, true);
  console.log(JSON.stringify(habit))
  console.log(JSON.stringify(habitsNew))
  await setHabitList(habitsNew);
}

/**
 * Removes habit from current user's habit list.
 * @param id GUID of habit
 */
export async function removeHabit(id: string) {
  var habits = await getHabitList();
  habits = removeByGuid(habits, id);
  await setHabitList(habits);
}

/* --------------------------------------------------
 *               CLOUD STORAGE HELPERS 
 * --------------------------------------------------
 */

export async function toCloud() {
}

export async function fromCloud() {
}

export async function syncDiskWithCloud() {
}

/* --------------------------------------------------
 *              JSON STRUCTURE HELPERS 
 * --------------------------------------------------
 */

export function getByGuid(list: any[], guid: string) {
  if (list == undefined) { return null }
  var item = list.find(obj => {
    return obj.id === guid
  });
  if (item == undefined) {return null}
  else {return item;}
}

export function setByGuid(list: any[], item: any, end:boolean= false, preserve:boolean=true) {
  if (list === undefined) { list = []; }
  if (typeof item.id == 'undefined') { return list }
  var itemIndex=list.findIndex(obj => {
    return obj.id === item.id
  })
  if (itemIndex >=0) {
    if (preserve) {
      var oldItem = list[itemIndex]; // edit me
      for (let i of jsonDiffKeys(item, oldItem)) {
        oldItem[i] = item[i];
      }
    } else {
      list[itemIndex] = item
    }
      
  } else {
    !end ? list.unshift(item) : list.push(item);
  }
  return list;
}

export function removeByGuid(list: any[], guid: string) {
  // if (list === undefined) { list = [] }
  var itemIndex=list.findIndex(obj => {
    return obj.id === guid;
  })
  if (itemIndex > -1) {
    list.splice(itemIndex, 1);
  }
  return list;
}

export function objVal(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

// NOTE: NOT RECURSIVE
export function jsonDiffKeys(fromObj: any, toObj: any) {
  var diffKeys: any[] = [];
  for (let i of Object.keys(fromObj)) {
    if (fromObj[i] != toObj[i] || typeof toObj[i] == 'undefined') {
      diffKeys.push(i);
    }
  }
  return diffKeys
}

/**
 * Generate RFC-compliant UUID based on time. ID's generated more than 1ms apart are 100% unique.
 * Ripped shamelessly from https://stackoverflow.com/a/44078785/9096067
 * @return generated UUID
 */
export function genUUIDTime() {
  let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
  let guid = [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');
  return guid;
}

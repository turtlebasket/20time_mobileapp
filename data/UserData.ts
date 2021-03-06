import AsyncStorage from '@react-native-async-storage/async-storage'
import { Value } from 'react-native-reanimated';
import uuid from 'uuid';

/* ---------------------
 * LOCAL STORAGE HELPERS 
 * ---------------------
 */

// returns every stored (logged-in) user object, tasks, friends and all
export async function getAllUsers() {
  const users = await AsyncStorage.getItem('users');
  return users != null ? JSON.parse(users) : null;
}

// returns CURRENT user ID
export async function getCurrentUserId() { 
  const userId = await AsyncStorage.getItem('currentUser');
  return userId;
}

// returns actual user object for CURRENT user
export async function getCurrentUser() { 
  const userId = await AsyncStorage.getItem('currentUser');
  const usersStr = await AsyncStorage.getItem('users');
  if (usersStr === null || userId == null) return
  const users = JSON.parse(usersStr);
  const currentUser = getByGuid(users, userId)
  return currentUser;
}

// sets ANY user
export async function setUser(user: any) {
  var users = await getAllUsers();
  setByGuid(users, user)
  await AsyncStorage.setItem('users', JSON.stringify(users));
}

// returns todo lists of CURRENT user
export async function getTodoLists() { 
  const user = await getCurrentUser();
  return user.todoLists ? user.todoLists : [];
}

// returns one todo list of CURRENT user specified by ID
export async function getTodoList(id: string) { 
  const user = await getCurrentUser();
  return getByGuid(user.todoLists, id);
}

// CURRENT USER ONLY
export async function setTodoList(todoList: any) {
  const user = await getCurrentUser();
  var targetTodoListOld = {};
  getTodoLists().then(val => {targetTodoListOld = getByGuid(user.todoLists, todoList.id)})
  user.todoLists = setByGuid(user.todoLists, todoList)
  setUser(user);
}

// add OR unshift todo to CURRENT user's todolist by todolist ID
export async function setTodoItem(listId: string, todo: any, end:boolean=false) {
  var user = await getCurrentUser();
  const todoList = getByGuid(user.todoLists, listId);
  if (todoList == null) return
  todoList.todoItems = setByGuid(todoList.todoItems, todo, end=end);
  setUser(user);
}

/* ---------------------
 * CLOUD STORAGE HELPERS 
 * ---------------------
 */

export async function toCloud() {
}

export async function fromCloud() {
}

export async function syncDiskWithCloud() {
}

/* ----------------------
 * JSON STRUCTURE HELPERS
 * ----------------------
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

// NOTE: NOT RECURSIVE
export function jsonDiffKeys(obj1: any, obj2: any) {
  var diffKeys: any[] = [];
  for (let i of Object.keys(obj1)) {
    if (obj1[i] != obj2[i]) {
      diffKeys.push(i);
    }
  }
  return diffKeys
}
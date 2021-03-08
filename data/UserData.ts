import AsyncStorage from '@react-native-async-storage/async-storage'
import { useScrollToTop } from '@react-navigation/native';
import { Value } from 'react-native-reanimated';
import uuid from 'uuid';

/* ---------------------
 * LOCAL STORAGE HELPERS 
 * ---------------------
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
 * Set TodoList of current user
 * @param todoList TodoList object 
 */
export async function setTodoList(todoList: any) {
  const user = await getCurrentUser();
  var targetTodoListOld = {};
  getTodoLists().then(val => {targetTodoListOld = getByGuid(user.todoLists, todoList.id)})
  user.todoLists = setByGuid(user.todoLists, todoList)
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
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import TodoAllViewWrapped from './TodoList_ListView';
import TodoEditViewWrapped from './TodoItem_EditView';
import TodoListViewWrapped from './TodoItem_ListView';
import TodoListEditViewWrapped from './TodoList_EditView';

const StackNav = createStackNavigator();

export default class Todo extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="TodoLists" component={TodoAllViewWrapped}/>
        <StackNav.Screen name="EditTodoList" component={TodoListEditViewWrapped}/>
        <StackNav.Screen name="TodoItems" component = {TodoListViewWrapped}/>
        <StackNav.Screen name="EditTodoItem">
          {props => <TodoEditViewWrapped id={'abc'} />}
        </StackNav.Screen>
      </StackNav.Navigator>
    );
  }
}

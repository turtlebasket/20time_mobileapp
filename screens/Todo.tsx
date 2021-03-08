import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import TodoAllViewWrapped from './TodoList_ListView';
import TodoEditViewWrapped from './TodoItem_EditView';
import TodoListViewWrapped from './TodoItem_ListView';

const StackNav = createStackNavigator();

export default class Todo extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="TodoLists" component={TodoAllViewWrapped}/>

        <StackNav.Screen name="TodoItems" >
          {props => <TodoEditViewWrapped id={'abc'} />}
        </StackNav.Screen>
        <StackNav.Screen name="EditTodoItem">
          {props => <TodoEditViewWrapped id={'abc'} />}
        </StackNav.Screen>
      </StackNav.Navigator>
    );
  }
}

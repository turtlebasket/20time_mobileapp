import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import TodoAllViewWrapped from './TodoList_ListView';
import TodoEditViewWrapped from './TodoItem_EditView';
import TodoListViewWrapped from './TodoItem_ListView';
import TodoListEditViewWrapped from './TodoList_EditView';
import TodoItemDatePicker from './TodoItem_DatePicker';

const StackNav = createStackNavigator();

export default class Todo extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="TodoLists" component={TodoAllViewWrapped}/>
        <StackNav.Screen name="EditTodoList" component={TodoListEditViewWrapped}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
        <StackNav.Screen name="TodoItems" component={TodoListViewWrapped}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        />
        <StackNav.Screen name="EditTodoItem" component={TodoEditViewWrapped}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
        <StackNav.Screen name="PickDateTodoItem" component={TodoItemDatePicker}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
      </StackNav.Navigator>
    );
  }
}

import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import TodoAllViewWrapped from './TodoList_ListView';
import TodoEditView from './TodoItem_EditView';
import TodoListViewWrapped from './TodoItem_ListView';
import TodoListEditViewWrapped from './TodoList_EditView';
import TodoItemDatePickerView from './TodoItem_DatePickerView';

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
        <StackNav.Screen name="EditTodoItem" component={TodoEditView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
        <StackNav.Screen name="PickDateTodoItem" component={TodoItemDatePickerView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
      </StackNav.Navigator>
    );
  }
}

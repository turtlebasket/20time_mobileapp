import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import HabitListViewWrapper from './HabitListView';
import TodoAllView from './TodoList_ListView';
import TodoEditViewWrapped from './TodoItem_EditView';
import TodoListViewWrapped from './TodoItem_ListView';

const StackNav = createStackNavigator();

export default class Habits extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="HabitList">
          {props => HabitListViewWrapper}
        </StackNav.Screen>
      </StackNav.Navigator>
    );
  }
}

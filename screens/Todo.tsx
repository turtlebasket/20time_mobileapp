import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import TodoEditViewWrapped from './TodoEditView';
import TodoListViewWrapped from './TodoListView';

const StackNav = createStackNavigator();

export default class Todo extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="Todos" component={TodoListViewWrapped}/>
        <StackNav.Screen name="Edit">
          {props => <TodoEditViewWrapped id={'abc'} />}
        </StackNav.Screen>
        <StackNav.Screen name="Add">
          {props => <TodoEditViewWrapped id={''} />}
        </StackNav.Screen>
      </StackNav.Navigator>
    );
  }
}

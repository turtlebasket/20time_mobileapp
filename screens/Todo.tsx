import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { create } from 'react-test-renderer';
import IconButtonCircle from '../components/IconButtonCircle';
import IconButtonTransparent from '../components/IconButtonTransparent';
import styles from '../styles/Styles';
import TodoEditView from './TodoEditView';
import TodoListView from './TodoListView';

const StackNav = createStackNavigator();

export default class Todo extends Component {
  render() {
    return (
      <StackNav.Navigator
        // screenOptions={{
        //   headerStyle: styles.reactNavigationStackHeader,
        //   headerTitleStyle: [styles.pageTextLargeGreen, {fontSize: 30}],
        //   headerRight: () => (<IconButtonCircle icon={faPlus}/>)
        // }}
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="Todos" component={TodoListView}/>
        <StackNav.Screen name="Edit" component={TodoEditView}/>
      </StackNav.Navigator>
    );
  }
}

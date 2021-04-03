import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import HabitListViewWrapper from './Habit_ListView';
import HabitItemView from './Habit_ItemView';
import HabitEditView from './Habit_EditView';

const StackNav = createStackNavigator();

export default class Habits extends Component {
  render() {
    return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="HabitList" component={HabitListViewWrapper}/>
        <StackNav.Screen name="ViewHabitItem" component={HabitItemView}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        />
        <StackNav.Screen name="EditHabitItem" component={HabitEditView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
      </StackNav.Navigator>
    );
  }
}

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import styles from '../styles/Styles';
import ActivityListView from './Activity_ListView';

const StackNav = createStackNavigator();

export default function Activity() {
  return (
    <StackNav.Navigator
      screenOptions={{ headerShown: false }}
      >
      <StackNav.Screen name="ActivityFeed" component={ActivityListView}/>
    </StackNav.Navigator>
  );
}

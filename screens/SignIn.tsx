import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { topTabBarOptions } from '../styles/TopTabBarOptions';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

const mTabNav = createMaterialTopTabNavigator();

export default function SignInScreen(props: any) {

  return (
      <mTabNav.Navigator tabBarOptions={topTabBarOptions}>
        <mTabNav.Screen name="Login" component={LoginView}/>
        <mTabNav.Screen name="Register" component={RegisterView}/>
      </mTabNav.Navigator>
  );
}
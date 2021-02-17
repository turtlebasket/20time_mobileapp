/**
 * Main page for the app
 * 
 */

 // Project
import Profile from './screens/Profile';
import Todos from './screens/Todos';
import ShibeApi from './screens/ShibeApi';
import appColors from "./Colors";

// External
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faCheck,
  faCheckCircle,
  faDog, 
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <StatusBar
          backgroundColor={appColors.darker}
        />
      </View>
      <Tab.Navigator 
        tabBarOptions={{
          activeTintColor: appColors.green1,
          inactiveTintColor: appColors.lightGray,
          showLabel: false,
          style: { 
            backgroundColor: appColors.darker,
            height: 52,
            borderTopWidth: 0,
          }
        }}
      >
        <Tab.Screen name="Home" component={Todos} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCheck} color={color} size={size}/>
            )}
        } />
        <Tab.Screen name="Shibe API" component={ShibeApi} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faDog} color={color} size={size}/>
          )}
        } />
        <Tab.Screen name="Profile" component={Profile} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUserCircle} color={color} size={size}/>
          )}
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

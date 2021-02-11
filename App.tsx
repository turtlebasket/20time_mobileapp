/**
 * A THING!
 * 
 */

import React, { Component } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import About from './screens/About';
import ShibeApi from './screens/ShibeApi';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        // inactiveTintColor: '#00bd87',
        activeTintColor: '#00e7a5',
        inactiveTintColor: '#00805b'
      }}>
        <Tab.Screen name="Home" component={Home} options={
          {tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
            )}
        } />
        <Tab.Screen name="Shibe API" component={ShibeApi} options={
          {tabBarIcon: ({color, size}) => (
            <Icon name="image" size={size} color={color} />
          )}
        } />
        <Tab.Screen name="About" component={About} options={
          {tabBarIcon: ({color, size}) => (
            <Icon name="info" size={size} color={color} />
          )}
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

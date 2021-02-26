/**
 * Main page for the app
 * 
 */

 // Project
import Profile from './screens/Profile';
import ListViewV2 from './screens/ListView';
import TodoEditor from './screens/TodoEditView';
import ConceptDemo from './screens/ConceptDemo';
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
  faCheckDouble,
  faDog, 
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import ListView from './screens/ListView';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <StatusBar
          backgroundColor={appColors.dark}
        />
      </View>
      <Tab.Navigator 
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: appColors.green1,
          inactiveTintColor: appColors.lightGray,
          showLabel: false,
          style: { 
            backgroundColor: appColors.dark,
            height: 50,
            // borderTopWidth: 0,
            borderTopWidth: 1,
            borderTopColor: appColors.lightGray
          }
        }}
      >
        <Tab.Screen name="Home" component={ListView} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCheckDouble} color={color} size={size}/>
            )}
        } />
        <Tab.Screen name="Shibe API" component={ConceptDemo} options={
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

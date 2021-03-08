/**
 * Main page for the app
 */

 // Project
import Profile from './screens/Profile';
import ListViewV2 from './screens/TodoItem_ListView';
import TodoEditor from './screens/TodoItem_EditView';
import ConceptDemo from './screens/ConceptDemo';
import Habits from './screens/Habits';
import appColors from "./styles/Colors";

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
  faMountain, 
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import TodoListView from './screens/TodoItem_ListView';
import Todo from './screens/Todo';
import appNavTheme from './styles/NavigationTheme';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer
      theme={appNavTheme}
    >
      <View>
        <StatusBar
          backgroundColor={appColors.black}
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
            borderTopWidth: 0,
            // borderTopWidth: 1,
            borderTopColor: appColors.lightGray
            // borderTopColor: appColors.green1
          }
        }}
      >
        <Tab.Screen name="Todo" component={Todo} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCheckDouble} color={color} size={size}/>
            )}
        } />
        <Tab.Screen name="Habits" component={Habits} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faMountain} color={color} size={size}/>
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

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
import { Platform, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faBroadcastTower,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faDog, 
  faHeart, 
  faMountain, 
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import TodoListView from './screens/TodoItem_ListView';
import Todo from './screens/Todo';
import appNavTheme from './styles/NavigationTheme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ActivityListView from './screens/Activity_ListView';
import ConceptDemo2 from './screens/ConceptDemo2';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './data/GqlUtil';

const Tab = createBottomTabNavigator();

const App = () => {

  changeNavigationBarColor(appColors.androidNavbarBackground, false, true);

  return (
    <ApolloProvider client={apolloClient}>
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
            // borderBottomWidth: Platform.OS == 'android' ? 1 : 0,
            // borderTopWidth: 1,
            borderTopColor: appColors.lightGray,
            borderBottomColor: appColors.lightGray,
            paddingHorizontal: 14,
          }
        }}
      >
        <Tab.Screen name="Todo" component={Todo} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCheck} color={color} size={size}/>
            )}
        } />

        <Tab.Screen name="Habits" component={Habits} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faMountain} color={color} size={size}/>
          )}
        } />

        <Tab.Screen name="Activity" component={ActivityListView} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faHeart} color={color} size={size}/>
          )}
        } />

        {/*
        <Tab.Screen name="NetConcept" component={ConceptDemo2} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBroadcastTower} color={color} size={size}/>
          )}
        } />
        */}

        {/*
        <Tab.Screen name="Concept Demo" component={ConceptDemo} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faDog} color={color} size={size}/>
          )}
        } />
        */}

        <Tab.Screen name="Profile" component={Profile} options={
          {tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faUserCircle} color={color} size={size}/>
          )}
        } />
      </Tab.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;

/**
 * Main page for the app
 */

 // Project
import Profile from './screens/Profile';
import ConceptDemo from './screens/ConceptDemo';
import Habits from './screens/Habits';
import appColors from "./styles/Colors";

// External
import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import appNavTheme from './styles/NavigationTheme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignIn';

const Stack = createStackNavigator();

const App = () => {

  changeNavigationBarColor(appColors.androidNavbarBackground, false, true);

  return (
    <NavigationContainer
      theme={appNavTheme}
    >
      <View>
        <StatusBar
          backgroundColor={appColors.black}
        />
      </View>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SignIn" component={SignInScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        />
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

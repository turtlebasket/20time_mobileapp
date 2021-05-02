import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import LoginView from './Login';
import ProfileView from './ProfileView';
import RegisterView from './Register';

const StackNav = createStackNavigator();

export default function Profile(props: any) {

  return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="ProfileView" component={ProfileView}/>
        <StackNav.Screen name="LoginView" component={LoginView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}/>
        <StackNav.Screen name="RegisterView" component={RegisterView}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}/>
      </StackNav.Navigator>
  );
}
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Transition } from 'react-native-reanimated';
import LoginView from './LoginView';
import ProfileEditView from './ProfileEditView';
import ProfileSettingsHome from './ProfileSettingsHome';
import ProfileView from './ProfileView';
import RegisterView from './RegisterView';
import SignInScreen from './SignIn';

const StackNav = createStackNavigator();

export default function Profile(props: any) {

  return (
      <StackNav.Navigator
        screenOptions={{ headerShown: false }}
        >
        <StackNav.Screen name="ProfileView" component={ProfileView}/>
        <StackNav.Screen name="ProfileSettingsView" component={ProfileSettingsHome}/>
        <StackNav.Screen name="ProfileEditView" component={ProfileEditView}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </StackNav.Navigator>
  );
}
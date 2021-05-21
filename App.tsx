/**
 * Main page for the app
 */

 // Project
import appColors from "./styles/Colors";

// External
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import appNavTheme from './styles/NavigationTheme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignIn';
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';

const Stack = createStackNavigator();

const App = () => {

  changeNavigationBarColor(appColors.androidNavbarBackground, false, true);
  const queryClient = new QueryClient();

  return (
    // <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={appNavTheme}
      >
        <View>
          <StatusBar
            backgroundColor={appColors.black}
          />
        </View>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="SignIn" component={SignInScreen}
          options={{
            // ...TransitionPresets.SlideFromRightIOS,
          }}
          />
          <Stack.Screen name="Home" component={HomeScreen}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
    // </Provider>
  );
}

export default App;

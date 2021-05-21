import { faCheck, faHeart, faMountain, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchHabits, fetchUserData } from "../api/api";
import { supabase, userId } from "../data/SupabaseUtil";
import appColors from "../styles/Colors";
import ActivityListView from "./Activity_ListView";
import Habits from "./Habits";
import Profile from "./Profile";
import Todo from "./Todo";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {

  const queryClient = useQueryClient();

  useEffect(() => {

    queryClient.prefetchQuery('userData', fetchUserData);
    queryClient.prefetchQuery('habits', fetchHabits);

  }, [])

  return (
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

  )

}
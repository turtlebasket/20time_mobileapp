import React, { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import styles from "../styles/Styles";
import TouchableNativeFeedbackCustom from "./TouchableNativeFeedbackCustom";
import {v4 as uuidv4} from 'uuid';
import { getHabitList } from "../data/UserData";
import { useNavigation } from "@react-navigation/core";

type props = {
  id: string;
  title: string;
  description?: string; //maybe
}

export default function HabitCard(props: props) {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
    onPress={() => {
      navigation.navigate("ViewHabitItem", {id: props.id})
    }}
    >
      <View style={styles.card}>
        <Text style={[styles.pageTitle, {/* more styles here */}]}>{props.title}</Text>
        {/* ADD GRAPH LATER */}
      </View>
    </TouchableNativeFeedback>
  );
}
import React, { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import styles from "../styles/Styles";
import TouchableNativeFeedbackCustom from "./TouchableNativeFeedbackCustom";
import {v4 as uuidv4} from 'uuid';
import { getHabitList } from "../data/UserData";

type props = {
  id: string;
  title: string;
  description?: string; //maybe
}

export default function HabitCard(props: props) {

  return (
    <TouchableNativeFeedback
    onPress={() => {
      console.log("PRESSED"); // for now, add navigation behavior later
    }}
    >
      <View style={styles.card}>
        <Text style={[styles.pageTitle, {/* more styles here */}]}>{props.title}</Text>
        {/* ADD GRAPH LATER */}
      </View>
    </TouchableNativeFeedback>
  );
}
import React, { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import styles from "../styles/Styles";
import TouchableNativeFeedbackCustom from "./TouchableNativeFeedbackCustom";
import {v4 as uuidv4} from 'uuid';
import { getHabitList } from "../data/UserData";
import { useNavigation } from "@react-navigation/core";
import HabitProgressThumbnail from "./HabitProgressThumbnail";
import HabitProgressGraphThumbnail from "./HabitProgressGraphThumbnail";

type props = {
  id: string;
  title: string;
  // progress: string;
  description?: string; //maybe
  data?: any;
}

export default function HabitCard(props: props) {
  const navigation = useNavigation();
  const { id, title, description, data } = props;

  return (
    <TouchableNativeFeedback
    onPress={() => {
      navigation.navigate("ViewHabitItem", {id: id})
    }}
    >
      <View style={[styles.card, {flex: 1, flexDirection: 'row'}]}>
        <Text style={[styles.pageTitle, {/* more styles here */}]}>{title}</Text>
        <View style={{marginLeft: 'auto'}}>
          <HabitProgressGraphThumbnail data={data ? data : [0, 0]}/>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
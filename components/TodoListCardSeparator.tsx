import React from 'react';
import { View } from "react-native";
import appColors from "../styles/Colors";

export default function TodoListCardSeparator() {
  return (
    <View
      style={{
        width: "90%",
        height: 1,
        backgroundColor: appColors.midGray,
        alignSelf: 'center'
      }}
    />
  );
}
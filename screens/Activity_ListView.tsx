import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";

export default function ActivityListView() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.pageTitleLargeGreen}>Get backend working first</Text>
      </View>
    </View>
  )
}
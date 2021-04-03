import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import IconButtonTransparent from "../components/IconButtonTransparent";
import XButton from "../components/XButton";
import { getCurrentUser } from "../data/UserData";
import appColors from "../styles/Colors";
import styles from "../styles/Styles";

type props={
  route: any;
}

export default function HabitItemView(props: props) {
  const navigation = useNavigation();
  const route = props.route;

  const [title, setTitle] = useState();
  const [description, setDescription] = useState()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMultiline}>
        <BackButton/>
        <Text style={styles.pageTitleLargeGreen}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
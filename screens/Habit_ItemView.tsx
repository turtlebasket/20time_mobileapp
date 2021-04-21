import { faBackward, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import IconButtonTransparent from "../components/IconButtonTransparent";
import XButton from "../components/XButton";
import { getCurrentUser, getHabit, removeHabit, removeTodoItem } from "../data/UserData";
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

  getHabit(route.params.id).then((val) => {
    setTitle(val.title);
    setDescription(val.description);
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMultiline}>
        <BackButton/>
        <Text style={styles.textBoxTitle}>{title}</Text>
        <View style={{marginLeft: 'auto'}}>
          <IconButtonTransparent icon={faPencilAlt} color={appColors.lightGray} 
          onPress={() => {
            navigation.navigate("EditHabitItem", {id: route.params.id});
          }}
          />
        </View>
      </View>
      <Text style={[styles.textBox, {color: appColors.lighterGray, width: '94%',
        display: description ? 'flex' : 'none' }]}>{description}</Text>
    </SafeAreaView>
  );
}
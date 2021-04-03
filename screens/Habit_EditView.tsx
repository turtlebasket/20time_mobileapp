/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component, useState } from 'react';
import { View } from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { getHabitList, setHabit } from '../data/UserData';
import { v4 as uuidv4 } from 'uuid';
import XButton from '../components/XButton';

type props = {
  route: any;
}

export default function HabitEditView(props: props) {
  const navigation = useNavigation();
  const route = props.route;

  const [id, setId] = useState<string>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (typeof route.params.id != 'undefined') {
    getHabitList().then((val) => {
      setId(route.params.id);
      setTitle(val.title);
      setDescription(val.description);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerMultiline}>
        <XButton/>
        <TextInput style={styles.textBoxTitle}
        multiline
        placeholderTextColor={appColors.lightGray}
        placeholder={"Habit Name"}
        selectionColor={appColors.green1}
        textAlign={'left'}
        value={title}
        onChangeText={(contents: any) => {
          // setTitle(contents);
          setHabit({id: id, title: contents});
          console.log(contents);
        }}
        />
      </View>
    </View>
  );
}

/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { getHabit, getHabitList, removeHabit, setHabit } from '../data/UserData';
import { v4 as uuidv4 } from 'uuid';
import XButton from '../components/XButton';

type props = {
  route: any;
}

export default function HabitEditView(props: props) {
  const navigation = useNavigation();
  const route = props.route;

  // if I choose to do manual save instead of auto-save
  const [edited, setEdited] = useState(false);

  const [id, setId] = useState<string>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // basically the functional equivalent of componentDidMount()
  useEffect(() => {
    if (typeof route.params.id != 'undefined') {
      getHabit(route.params.id).then((val) => {
        console.log("Found Habit by ID");
        setId(val.id);
        setTitle(val.title);
        setDescription(val.description);
      }).catch(e => {
        console.log(e);
        if (e instanceof TypeError) {
          setId(route.params.id);
        }
      })
    } else {
      setId(uuidv4());
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerMultiline}>
        <XButton onPress={() => {
          Alert.alert(
            'Save changes?',
            'Discarded changes cannot be uncovered.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log("cancelled")
              },
              {
                text: 'Discard',
                onPress: () => {
                  navigation.goBack();
                }
              },
              {
                text: 'OK',
                onPress: () => {
                  setHabit({id: id, title: title, description: description}).then(() => {
                    navigation.navigate("HabitList")
                  });
                }
              }
            ],
            {cancelable: false}
          )
          setHabit({id: id, title: title, description: description})
        }} />
        <TextInput style={styles.textBoxTitle}
        multiline
        placeholderTextColor={appColors.lightGray}
        placeholder={"Habit Name"}
        selectionColor={appColors.green1}
        textAlign={'left'}
        value={title}
        onChangeText={contents => setTitle(contents)}
        />
        <View style={{marginLeft: 'auto'}}>
          <IconButtonTransparent icon={faTrash} color={appColors.red1} onPress={() => {
            Alert.alert(
              'Delete Habit?',
              'This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log("cancelled")
                },
                {
                  text: 'OK',
                  onPress: () => {
                    removeHabit(route.params.id).then(() => {
                      navigation.navigate("HabitList")
                    });
                  }
                }
              ],
              {cancelable: false}
            )
          }}/>
        </View>
      </View>
      <TextInput // description
        style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%', color: appColors.lighterGray}]}
        multiline={true}
        placeholder={"Description"}
        placeholderTextColor={appColors.lightGray}
        selectionColor={appColors.lightGray}
        textAlign={'left'}
        value={description}
        onChangeText={contents => setDescription(contents)}
      />
    </View>
  );
}

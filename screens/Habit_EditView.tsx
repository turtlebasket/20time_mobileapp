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
import XButton from '../components/XButton';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchHabits, removeHabit, setHabit } from '../api/api';

type props = {
  route: any;
}

export default function HabitEditView(props: props) {
  const navigation = useNavigation();
  const route = props.route;
  const queryClient = useQueryClient();

  const [edited, setEdited] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {data: habits} = useQuery('habits', fetchHabits);

  const habitSetMutation = useMutation('habits', setHabit, {onSuccess: () => {
    queryClient.invalidateQueries('habits');
  }})

  const habitDelMutation = useMutation('habits', removeHabit, {onSuccess: () => {
    queryClient.invalidateQueries('habits');
  }})

  // const {data: habit, error} = useQuery('habits', function(){fetchHabit(route.params.id)});
  // const {title, description} = habit;

  // basically the functional equivalent of componentDidMount()
  useEffect(() => {
    if (typeof route.params.id !== 'undefined') {
      const {title, description} = habits?.filter((item: any) => {
        return item.id == route.params.id;
      })[0];
      setTitle(title);
      setDescription(description);
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerMultiline}>
        <XButton onPress={() => {
          if(edited) {
            Alert.alert(
              'Discard changes?',
              'Discarded changes cannot be uncovered.',
              [
                { text: 'Cancel', },
                { text: 'Discard', onPress: () => { navigation.goBack(); } },
              ],
              {cancelable: true}
            )
          } else navigation.goBack();
        }} />
        <TextInput style={styles.textBoxTitle}
        multiline
        placeholderTextColor={appColors.lightGray}
        placeholder={"Habit Name"}
        selectionColor={appColors.green1}
        textAlign={'left'}
        value={title}
        onChangeText={contents => {setTitle(contents); setEdited(true)}}
        />
        <View style={{marginLeft: 'auto'}}>
          {
            typeof route.params.id !== 'undefined' &&
              <IconButtonTransparent icon={faTrash} color={appColors.red1} onPress={() => {
                Alert.alert(
                  'Delete Habit?',
                  'This action cannot be undone.',
                  [
                    { text: 'Cancel', },
                    { text: 'OK', onPress: () => {
                      habitDelMutation.mutateAsync(route.params.id);
                      navigation.navigate("HabitList");
                    }
                    }
                  ],
                  {cancelable: false}
                )

              }}/>
          }
        </View>
        <IconButtonCircle icon={faSave} onPress={() => {
          if (edited) {
            habitSetMutation.mutateAsync({id: route.params.id, title: title, description: description});
            navigation.goBack();
          }
        }}/>
      </View>
      <TextInput // description
        style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%', color: appColors.lighterGray}]}
        multiline={true}
        placeholder={"Description"}
        placeholderTextColor={appColors.lightGray}
        selectionColor={appColors.lightGray}
        textAlign={'left'}
        value={description}
        onChangeText={contents => {setDescription(contents); setEdited(true)}}
      />
    </View>
  );
}

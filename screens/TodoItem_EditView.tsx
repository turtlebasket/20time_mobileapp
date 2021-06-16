/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faCalendarDay, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { getTodoItem, getTodoList, removeTodoItem, setTodoItem } from '../data/UserDataLocal';
import { v4 as uuidv4 } from 'uuid';
import { Text } from 'react-native-svg';
import SelectValueButtonTransparent from '../components/SelectValueButtonTransparent';
import XButton from '../components/XButton';

interface TodoEditorProps {
  id: string;
  listId: string;
}

interface TodoEditorState {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  complete: boolean;
  dateColor: string;
}

export default function TodoEditView(props: any) {

  const navigation = useNavigation();
  const { route }  = props;

  const { listId } = route.params;

  // delete later
  const [id, setId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complete, setComplete] = useState(false);
  const [dateColor, setDateColor] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const { id } = route.params;
    let uuid = props.id ? id : uuidv4();
    setId(uuid);
    // console.log(`UUID ${uuid}`)
    getTodoItem(listId, uuid).then(val => {
      var complete: boolean = val.complete ? val.complete : false;
      setTitle(val.title);
      setDescription(val.description);
      setComplete(complete);
      setDueDate(val.dueDate);
    }).then(() => {
      updateDueDateColor();
    });
  }, []);

  const wantsToRefresh = navigation.addListener('focus', () => {
    refreshFromStorage();
  })

  const refreshFromStorage = () => {
    getTodoItem(listId, id).then(val => {
      setTitle(val.title);
      setDescription(val.description);
      setComplete(val.complete);
      setDueDate(val.dueDate);
    }).then(() => {
      updateDueDateColor();
    });
  }

  const updateDueDateColor = () => {
    console.log("UPDATING")

    // @ts-ignore
    const dateObj = new Date(parseInt(dueDate));
    const today = new Date();

    if (typeof dueDate != 'undefined') {
      if (dateObj.getDate() == today.getDate() && dateObj.getMonth() == today.getMonth() && dateObj.getFullYear() == today.getFullYear()) { // if dueDate is today
        setDateColor(appColors.green1);
      }
      else if (dateObj < today) { // if dueDate was earlier than today
        setDateColor(appColors.red1);
      }
      else {
        setDateColor(appColors.lighterGray);
      }
    }
  }

  // @ts-ignore
  const dateObj = new Date(parseInt(dueDate))

  return (
    <View style={styles.container}>

      <View style={[styles.headerMultiline, {}]}>
        <XButton/>
        <TextInput // title
          // must set both minwidth & width for some reason
          style={[styles.textBoxTitle, {minWidth: 170, width: 210}]} 
          multiline
          placeholder={"Title"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
          value={title}
          onChangeText={(contents: any) => {
            setTitle(contents);
            setTodoItem(listId, {id: id, title: contents, complete: complete});
          }}
        />

        <View style={{marginLeft: 'auto'}}>
          <IconButtonTransparent 
          size={26}
          icon={faTrash} 
          color={appColors.red1} 
          onPress={() => {
            Alert.alert(
              'Delete item?',
              'This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log("cancelled")
                },
                {
                  text: 'OK',
                  onPress: () => {
                    removeTodoItem(listId, id).finally(() => {
                      navigation.navigate("TodoItems");
                    });
                  }
                }
              ],
              {cancelable: false}
            )
          }}
          />
        </View>
        <IconButtonCircle icon={faSave} onPress={() => {
          console.log("hi")
        }}/>
      </View>

        {/* DELETE SAVE BUTTON FOR NOW
        <View style={{marginLeft: 'auto'}}>
          <IconButtonCircle icon={faSave} onPress={() => {
            setTodoItem(listId, 
              {
                id: id,
                title: title,
                description: description,
              }
            ).then(() => {
              navigation.navigate("TodoItems")
            });
          }}/>
        </View>
      </View> */}

      <TextInput // description
        style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%'}]}
        multiline={true}
        placeholder={"Description"}
        placeholderTextColor={appColors.lightGray}
        selectionColor={appColors.green1}
        textAlign={'left'}
        value={description}
        onChangeText={(contents) => {
          setDescription(contents);
          setTodoItem(listId, {id: id, description: contents});
        }}
        ref={React.createRef()}
      />

      <SelectValueButtonTransparent icon={faCalendarDay} 
      text={dueDate ? `Due ${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}` : "Choose Due Date"} 
      color={dateColor}
      filled={typeof dueDate != 'undefined'}
      onPressSelect={() => {
        navigation.navigate("PickDateTodoItem", {listId: listId, id: id});
        
      }}
      onPressCancel={() => {
        Alert.alert(
          'Clear due date?',
          'This action cannot be undone.',
          [
            {
              text: 'Cancel',
              onPress: () => {/* do nothing */}
            },
            {
              text: 'OK',
              onPress: () => {
                setTodoItem(listId, {id: id, description: description, complete: complete, dueDate: undefined})
                // @ts-ignore
                setDueDate(undefined);
              }
            }
          ],
          {cancelable: false}
        )
      }}
      />

    </View>
  );
}

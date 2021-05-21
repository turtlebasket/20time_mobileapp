/* Card with (& representing) Todo item.
 */

import styles from '../styles/Styles'
import appColors from '../styles/Colors'

import { 
  TouchableHighlight, 
  Text, 
  TouchableWithoutFeedback, 
  GestureResponderHandlers, 
  Vibration
} from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faCalendar,
  faCalendarAlt,
  faCheckCircle, 
  faCircle, 
  faPencilAlt, 
} from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { getTodoList, setTodoItem } from '../data/UserDataLocal';
import appConfig from '../data/AppConfig';

type TodoItemCardProps = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  complete: boolean | undefined;
  selected: boolean;
  dragBehavior: any;
  listId: string;
  navigation: any;
  refreshFromStorage: any;
}

type TodoItemCardState = {
  complete: boolean;
  pressed: boolean;
  dateColor: string;
}

// export default class TodoItemCard extends Component<TodoItemCardProps, TodoItemCardState> {
export default function TodoItemCard(props: TodoItemCardProps) {

  const [complete, setComplete] = useState(props.complete ? props.complete : false);
  const [pressed, setPressed] = useState(false);
  const [dateColor, setDateColor] = useState(appColors.lighterGray);
  
  const { navigation, title, description, dueDate, id, listId, dragBehavior, selected, refreshFromStorage} = props;
  // @ts-ignore
  const dateObj = new Date(parseInt(dueDate));
  const today = new Date()

  function updateDueDateColor() {
    if (typeof dueDate != 'undefined') {
      if (complete) {
        setDateColor(appColors.lightGray)
      }
      else if (dateObj.getDate() == today.getDate() && dateObj.getMonth() == today.getMonth() && dateObj.getFullYear() == today.getFullYear()) { // if dueDate is today
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

  // IMPORTANT - use useEffect hook to update date color whenever date / completion status is changed / set
  // NOTE: it runs on component init so we chillin
  useEffect(() => {
    updateDueDateColor();
  }, [dueDate, complete])

  return (
    <TouchableWithoutFeedback 
    delayLongPress={appConfig.longPressDelay}
    onLongPress={!complete ? dragBehavior : null}
    onPressOut={() => {
      setPressed(false);
    }}
    onPress={() => {
      if (!complete) {
        navigation.navigate('EditTodoItem', {id: id, listId: listId});
      }
    }}
    >
    <View style={[styles.card, {minHeight: 67, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 6, justifyContent: 'center'}, 
      selected ? {backgroundColor: appColors.darkSelected} : (complete ? {backgroundColor: appColors.darker} : null)]}>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{margin: 'auto', justifyContent: 'center', alignContent: 'center'}}>
        <TouchableWithoutFeedback
        onPress={() => {
          const newComp = !complete;
          setTodoItem(listId, {id: id, complete: newComp}).then(() => {
            setComplete(newComp);
            refreshFromStorage();
          })
        }}
        >
        <FontAwesomeIcon 
          icon={complete ? faCheckCircle : faCircle} 
          size={33}
          style={{
          color: complete ? appColors.green1 : appColors.lightGray,
          marginRight: 20,
          }}
        />
        </TouchableWithoutFeedback>
      </View>

      <View style={{justifyContent: 'center'}}>
      <Text 
        // numberOfLines={1} 
        style={[
        styles.pageTextBold, complete ? styles.strikethrough : null,
        // FIX TITLE WIDTH 
        {flexGrow: 1, flexWrap: 'nowrap', minWidth: '40%', 
        color: complete ? appColors.lighterGray : appColors.white}]}>{title}</Text>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', marginRight: 8, display: typeof dueDate != 'undefined' ? 'flex' : 'none',}}>
          <FontAwesomeIcon icon={faCalendar} size={13} style={{
            alignSelf: 'center',
            marginRight: 4,
            color: dateColor,
          }}/>
          <Text numberOfLines={1} style={[styles.pageText, 
            {
              color: dateColor
            },
            complete ? styles.strikethrough : null]}>{`${dateObj.getMonth()+1}/${dateObj.getDate()}`}</Text>

        </View>

        <Text numberOfLines={1}
        style={[styles.pageText, {width: 170, 
          color: complete ? appColors.lightGray : appColors.lighterGray, 
          display: description ? 'flex' : 'none'},
          complete ? styles.strikethrough : null]}
          >{description}</Text>
      </View>
      </View>

      {/* COMMENT OUT EDIT BUTTON FOR NOW
      <View 
      style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',
      display: complete ? 'none' : 'flex' }}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('EditTodoItem', {id: id, listId: listId});
        }}>
          <FontAwesomeIcon 
            icon={faPencilAlt} 
            size={18} 
            style={{
            color: appColors.lightGray,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      */}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
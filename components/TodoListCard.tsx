/* Card with (& representing) one TodoList for a user to select.
 */

import styles from '../styles/Styles'
import appColors from '../styles/Colors'

import { 
  TouchableHighlight, 
  Text, 
  TouchableWithoutFeedback, 
  GestureResponderHandlers, 
  TouchableNativeFeedback
} from 'react-native'
import React, { Component } from 'react'
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faCheckCircle, 
  faCircle, 
  faEye, 
  faEyeSlash, 
  faPencilAlt, 
} from '@fortawesome/free-solid-svg-icons';

interface TodoCardProps {
  navigation: any;
  id: string;
  title: string;
  description: string;
  public: boolean;
  // length: number;
  selected: boolean;
  dragBehavior: any;
}

interface TodoCardState {
  pressed: boolean;
}

/* NOTE FOR LATER
 * The order of interfaces listed in Component<if1, if2> is ranked by PROPS, STATE. 
 * PAY ATTENTION TO THAT.
 * */
export default class TodoListCard extends Component<TodoCardProps, TodoCardState> {

  state={
    pressed: false
  };

  constructor(props: any) {
  super(props);
  }

  render() {
    const { navigation } = this.props

  return (
  <TouchableNativeFeedback 
  delayLongPress={240}
  // onLongPress={() => {this.setState({pressed: true})}}
  onLongPress={this.props.dragBehavior}
  onPressOut={() => {this.setState({pressed: false})}}
  onPress={() => {
    navigation.navigate("TodoItems", {id: this.props.id })
  }}
  >
  <View style={[styles.cardInvis, 
  {height: 70,
   paddingHorizontal: 14, 
   paddingVertical: 12, 
   marginBottom: 0, 
   justifyContent: 'center',
   borderRadius: 0,
  }, 
    this.props.selected ? {backgroundColor: appColors.dark} : null]}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{margin: 'auto', justifyContent: 'center', alignContent: 'center'}}>
        <FontAwesomeIcon 
          icon={this.props.public ? faEye : faEyeSlash} 
          size={24}
          style={{
          color: this.props.public ? appColors.lighterGray : appColors.lightGray,
          marginRight: 20,
          }}
        />
      </View>

      <View style={{justifyContent: 'center'}}>
        <Text 
        numberOfLines={1} 
        style={[
        styles.pageTextBold, {width: 180}]}>{this.props.title}</Text>
        <Text numberOfLines={1}
        style={[styles.pageText, {width: 170, color: appColors.lighterGray}, ]}
        >{this.props.description}</Text>
      </View>

      <View 
      style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            // console.log(`EDIT CARD ${this.props.id}`)
            navigation.navigate('EditTodoList', {id: this.props.id})
          }}
        >
        <FontAwesomeIcon 
          icon={faPencilAlt} 
          size={18} 
          style={{
          color: appColors.lightGray,
          }}
        />
        </TouchableWithoutFeedback>
      </View>

    </View>
  </View>

  </TouchableNativeFeedback>
  );
  }
}
/* Card with (& representing) one TodoList for a user to select.
 */

import styles from '../styles/Styles'
import appColors from '../styles/Colors'

import { 
  TouchableHighlight, 
  Text, 
  TouchableWithoutFeedback, 
  GestureResponderHandlers 
} from 'react-native'
import React, { Component } from 'react'
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faCheckCircle, 
  faCircle, 
  faPencilAlt, 
} from '@fortawesome/free-solid-svg-icons';

interface TodoCardProps {
  title: string;
  description: string;
  public: boolean;
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

  return (
  <TouchableWithoutFeedback 
  delayLongPress={240}
  // onLongPress={() => {this.setState({pressed: true})}}
  onLongPress={this.props.dragBehavior}
  onPressOut={() => {this.setState({pressed: false})}}
  >
  <View style={[styles.card, {height: 70, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 6, justifyContent: 'center'}, 
    this.props.selected ? {backgroundColor: appColors.darkSelected} : null]}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{margin: 'auto', justifyContent: 'center', alignContent: 'center'}}>
        <FontAwesomeIcon 
          icon={this.props.public ? faCheckCircle : faCircle} 
          size={33}
          style={{
          color: appColors.lighterGray,
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

    </View>
  </View>

  </TouchableWithoutFeedback>
  );
  }
}
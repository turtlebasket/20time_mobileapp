/* Card with (& representing) Todo item.
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

interface TodoItemCardProps {
  id: string;
  title: string;
  description: string;
  // panHandlers: GestureResponderHandlers;
  // completeInitial: boolean;
  selected: boolean;
  dragBehavior: any;
}

interface TodoItemCardState {
  complete: boolean;
  pressed: boolean;
}

/* NOTE FOR LATER
 * The order of interfaces listed in Component<if1, if2> is ranked by PROPS, STATE. 
 * PAY ATTENTION TO THAT.
 * */
export default class TodoItemCard extends Component<TodoItemCardProps, TodoItemCardState> {

  state={
  // complete: this.props.completeInitial,
  complete: false,
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
        <TouchableWithoutFeedback
        onPress={() => {
          this.setState({complete: !this.state.complete});
        }}
        >
        <FontAwesomeIcon 
          icon={this.state.complete ? faCheckCircle : faCircle} 
          size={33}
          style={{
          color: this.state.complete ? appColors.green1 : appColors.lightGray,
          marginRight: 20,
          }}
        />
        </TouchableWithoutFeedback>
      </View>

      <View style={{justifyContent: 'center'}}>
      <Text 
        numberOfLines={1} 
        style={[
        styles.pageTextBold, this.state.complete ? styles.strikethrough : null,
        {width: 180}]}>{this.props.title}</Text>
      <Text numberOfLines={1}
      style={[styles.pageText, {width: 170, color: appColors.lighterGray}, this.state.complete ? styles.strikethrough : null]}
      >{this.props.description}</Text>
      </View>

      <View 
      style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        <TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
  );
  }
}
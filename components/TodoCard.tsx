/* Card with (& representing) Todo item.
 */

import styles from '../styles/Styles'
import appColors from '../Colors'

import { TouchableHighlight, Text, TouchableWithoutFeedback, GestureResponderHandlers } from 'react-native'
import React, { Component } from 'react'
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBorderNone, faCheck, faCheckCircle, faCheckSquare, faCircle, faEdit, faGripLines, faPencilAlt, faSquare, faUserEdit } from '@fortawesome/free-solid-svg-icons';

interface TodoCardProps {
  title: string;
  description: string;
  panHandlers: GestureResponderHandlers;
  completeInitial: boolean;
  selected: boolean;
}

interface TodoCardState {
  complete: boolean;
  handlePressed: boolean;
}

/* NOTE FOR LATER
 * The order of interfaces listed in Component<if1, if2> is ranked by PROPS, STATE. 
 * PAY ATTENTION TO THAT.
 * */
class TodoCard extends Component<TodoCardProps, TodoCardState> {

  state={
    complete: this.props.completeInitial,
    handlePressed: false
  };

  constructor(props: any) {
    super(props);
  }

  render() {

    return (
      <TouchableWithoutFeedback 
        // delayLongPress={240}
        // onLongPress={() => {this.setState({handlePressed: true})}}
        // onPressOut={() => {this.setState({handlePressed: false})}}
      >
        <View style={[styles.card, {height: 82}, this.props.selected ? {backgroundColor: appColors.darkSelected} : null]}>
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

              <View>
                <Text 
                  numberOfLines={1} 
                  style={[
                    styles.pageTextLarge, this.state.complete ? styles.strikethrough : null,{width: 180}]}>{this.props.title}</Text>
                <Text numberOfLines={1}
                style={[styles.pageText, {width: 170}, this.state.complete ? styles.strikethrough : null]}
                >{this.props.description}</Text>
              </View>

            <View {...this.props.panHandlers}
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
              <TouchableWithoutFeedback
                // {...this.props.panHandlers}
              >
                <FontAwesomeIcon 
                  icon={faGripLines} 
                  size={22} 
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
export default TodoCard;
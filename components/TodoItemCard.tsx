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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { setTodoItem } from '../data/UserData';
import appConfig from '../data/AppConfig';

interface TodoItemCardProps {
  id: string;
  title: string;
  description: string;
  complete: boolean | undefined;
  selected: boolean;
  dragBehavior: any;
  listId: string;
  navigation: any;
  refreshFromStorage: any;
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
    complete: this.props.complete ? this.props.complete : false,
    pressed: false
  };

  constructor(props: any) {
    super(props);
  }

  render() {

    const { navigation } = this.props
    var { complete } = this.state

    return (
      <TouchableWithoutFeedback 
      delayLongPress={appConfig.longPressDelay}
      // onLongPress={() => {this.setState({pressed: true})}}
      onLongPress={!this.state.complete ? this.props.dragBehavior : null}
      onPressOut={() => {
        this.setState({pressed: false});
      }}
      onPress={() => {
        if (!this.state.complete) {
          navigation.navigate('EditTodoItem', {id: this.props.id, listId: this.props.listId});
        }
      }}
      >
      <View style={[styles.card, {height: 67, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 6, justifyContent: 'center'}, 
        this.props.selected ? {backgroundColor: appColors.darkSelected} : (this.props.complete ? {backgroundColor: appColors.darker} : null)]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{margin: 'auto', justifyContent: 'center', alignContent: 'center'}}>
          <TouchableWithoutFeedback
          onPress={() => {
            const newComp = !this.state.complete;
            setTodoItem(this.props.listId, {id: this.props.id, complete: newComp}).then(() => {
              this.setState({complete: newComp});
              this.props.refreshFromStorage();
            })
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
          styles.pageTextBold, complete ? styles.strikethrough : null,
          {width: 180, color: complete ? appColors.lighterGray : appColors.white}]}>{this.props.title}</Text>
        <Text numberOfLines={1}
        style={[styles.pageText, {width: 170, 
          color: complete ? appColors.lightGray : appColors.lighterGray, 
          display: this.props.description ? 'flex' : 'none'},
          this.state.complete ? styles.strikethrough : null]}
          >{this.props.description}</Text>
        </View>

        {/* COMMENT OUT EDIT BUTTON FOR NOW
        <View 
        style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center',
        display: this.state.complete ? 'none' : 'flex' }}>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('EditTodoItem', {id: this.props.id, listId: this.props.listId});
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
}
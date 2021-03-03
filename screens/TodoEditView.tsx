/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { View } from 'react-native';

import {toDisk, fromDisk} from '../data/UserData'
import { NavigationProp } from '@react-navigation/native';

interface TodoEditorProps {
  id: string;
  navigator: any; // NavigationProp?
}

interface TodoEditorState {
  title: string;
  description: string;
}

export default class TodoEditor extends Component<TodoEditorProps, TodoEditorState> {

  constructor(props: any) {
    super(props);
    this.state={
      title: "",
      description: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardInvis}>
          <TextInput // title
            style={styles.textBoxTitle}
            multiline={false}
            placeholder={"Title..."}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
            value={this.state.title}
          />
          <TextInput // description
            style={[styles.textBox, {minHeight: 120}]}
            multiline={true}
            placeholder={"Description..."}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
            value={this.state.description}
          />
        </View>
      </View>
    );
  }
}

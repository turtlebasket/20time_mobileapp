/* Text Boxes
 */

import styles from '../styles/Styles'
import appColors from '../Colors'

import { TouchableHighlight, Text } from 'react-native'
import React, { Component } from 'react'
import { View } from 'react-native';

interface InputState {
  inputText: string
}

class TodoInput extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      inputText: ""
    }
  }
}
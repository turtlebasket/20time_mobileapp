import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function SingleLineTextBox(props: any) {


  return (
    <TextInput 
    {...props}
    style={styles.textBox}
    placeholderTextColor={appColors.lightGray}
    selectionColor={appColors.green1}
    // underlineColorAndroid={appColors.green1}
    />
  )
}
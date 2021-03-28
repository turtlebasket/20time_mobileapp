import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type props = {
  filled: boolean, 
  icon: any, 
  color?: string, 
  text: string, 
  onPressSelect: any, 
  onPressCancel: any
}

export default function SelectValueButtonTransparent(props: props) {
    
  // default color green
  const color = props.color ? props.color : appColors.green1
  return (
    <TouchableNativeFeedback onPress={props.onPressSelect}>
      <View style={{
        margin: 8,
        padding: 8,
        flex: 0,
        flexDirection: 'row', 
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'red', borderWidth: 1, // visualize size
        }}>
        <FontAwesomeIcon icon={props.icon} size={20} color={props.filled ? color : appColors.lightGray}
        style={{
          marginHorizontal: 8
        }}
        />
        <Text style={[styles.pageTitle, {flex: 1, color: props.filled ? color : appColors.lightGray}]}>{props.text}</Text>
        <View style={{marginLeft: 'auto'}}>
          <TouchableNativeFeedback
          onPress={props.onPressCancel}
          >
            <FontAwesomeIcon icon={faTimes} 
            style={{marginHorizontal: 8, color: appColors.lightGray, display: props.filled ? 'flex' : 'none'}}/>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
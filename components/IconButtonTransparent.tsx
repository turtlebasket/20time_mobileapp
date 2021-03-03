import styles from '../styles/Styles'
import appColors from '../Colors'
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function IconButtonCircle(props: any) {
  var len = 36; 
  return (
    <TouchableWithoutFeedback>
      <View style={{
      height: len,
      width: len,
      margin: 10,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      // marginLeft: 'auto' 
    }}>
      <FontAwesomeIcon icon={props.icon} color={appColors.green1} 
      size={props.iconSize == null ? 20 : props.iconSize}/>
    </View>
    </TouchableWithoutFeedback>
  );
}
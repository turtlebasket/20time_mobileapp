import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function IconButtonCircle(props: any) {
  var len =36; 
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={{
      height: len,
      width: len,
      margin: 10,
      borderRadius: len / 2,
      backgroundColor: appColors.green1,
      alignItems: 'center',
      justifyContent: 'center',
      // marginLeft: 'auto',
    }}>
      <FontAwesomeIcon icon={props.icon} color={appColors.white} 
      size={props.iconSize == null ? 20 : props.iconSize}/>
    </View>
    </TouchableNativeFeedback>
  );
}
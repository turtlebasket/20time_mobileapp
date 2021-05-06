import React from 'react';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import IconButtonTransparent from "./IconButtonTransparent";

export default function XButton(props: any) {
  const navigation = useNavigation();
  const onPressDefault = () => {
    navigation.goBack();
  }
  return (
    <IconButtonTransparent { ...props } icon={faTimes} 
    onPress={props.onPress ? props.onPress : onPressDefault}
    />
  )
}

import React from 'react';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import IconButtonTransparent from "./IconButtonTransparent";

export default function XButton() {
  const navigation = useNavigation();
  return (
    <IconButtonTransparent icon={faTimes} 
    onPress={() => {
      navigation.goBack();
    }}
    />
  )
}

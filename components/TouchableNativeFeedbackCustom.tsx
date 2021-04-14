import React from 'react'
import { TouchableNativeFeedback } from "react-native"
import appColors from "../styles/Colors"

export default function TouchableNativeFeedbackCustom(props: any) {
  return (
    <TouchableNativeFeedback {...props} background={{color: appColors.lightGray, borderless: false}}/>
  )
}
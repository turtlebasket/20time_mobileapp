import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import styles from "../styles/Styles";
import { ProgressCircle } from 'react-native-svg-charts';
import appColors from "../styles/Colors";

type props = {
  rate: number,
  subText?: string
}
export default function HabitProgressCard(props: props) {
  const { rate, subText } = props
  return (
    <TouchableNativeFeedback>
      <View style={[styles.card, {flexDirection: 'row', width: '96%', minHeight: 60}]}>
        <ProgressCircle progress={rate} style={{height: 60, width: 60}} 
        progressColor={appColors.green1}
        backgroundColor={appColors.midGray}
        strokeWidth={6}
        animate={true}
         />
         <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 16}}>
           <Text style={styles.pageTitle}>{`${rate*100}% Success Rate`}</Text>
           <Text style={[styles.pageTextLight, {display: subText ? 'flex' : 'none'}]}>{subText}</Text>
         </View>
      </View>
    </TouchableNativeFeedback>
  );
}
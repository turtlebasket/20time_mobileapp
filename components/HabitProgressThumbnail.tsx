import React from 'react';
import { View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import appColors from '../styles/Colors';

type props = {
  progress: number,
  style?: any
}

export default function HabitProgressThumbnail(props: props) {

  const { progress, style } = props

  return (
    <View>
      <ProgressCircle progress={progress}
      progressColor={appColors.green1}
      backgroundColor={appColors.midGray}
      style={[style, {height: 30}]}
      />
    </View>
  );
}
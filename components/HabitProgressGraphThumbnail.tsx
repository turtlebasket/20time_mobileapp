import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import appColors from '../styles/Colors';

type props = {
  data: any,
  style?: any,
};

export default function HabitProgressGraphThumbnail(props: props) {

  const { data, style } = props

  return (
    <View style={{borderWidth: 1, borderColor: appColors.lightGray, borderRadius: 2}}>
      <LineChart data={data} 
      yMax={1} yMin={0}
      svg={{stroke: appColors.green1, strokeWidth: 2}}
      style={[style, {height: 30, width: 60}]}>
      </LineChart>
    </View>
  );
}
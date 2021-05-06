import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Grid, LineChart } from 'react-native-svg-charts';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

type props = {
  data: number[],
}

export default function HabitProgressCardGraph(props: props) {

  const { data } = props;

  return (
    <View style={[styles.card, {width: '96%'}]}>
      <Text style={styles.pageTitle}>Progress</Text>
      <LineChart style={{alignSelf: 'center', height: 170, minWidth: 170, width: '92%',
      marginHorizontal: 5, marginTop: 20,}}
      data={data}
      yMax={1} yMin={0}
      svg={{stroke: appColors.green1, strokeWidth: 3}}
      ><Grid svg={{stroke: appColors.lightGray, strokeWidth: 1}}/></LineChart>
    </View>
  );
}
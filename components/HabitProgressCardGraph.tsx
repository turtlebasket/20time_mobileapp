import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Grid, LineChart, YAxis } from 'react-native-svg-charts';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

type props = {
  data: number[],
}

export default function HabitProgressCardGraph(props: props) {

  const { data } = props;
  const contentInset = {top: 5, bottom: 5}

  return (
    <View style={[styles.card, {width: '96%'}]}>
      <Text style={[styles.pageTitle, {marginBottom: 8}]}>Progress</Text>
      <View style={{flexDirection: 'row'}}>
        <YAxis svg={{fontSize: 10, stroke: appColors.lighterGray}} 
        formatLabel={(value) => `${Math.floor(value*100)}%`}
        numberOfTicks={10} data={data}
        max={1} min={0}
        contentInset={contentInset}
        />
        <LineChart style={{alignSelf: 'center', height: 170, minWidth: 170, width: '92%',
        marginHorizontal: 5, marginTop: 20,}}
        data={data}
        yMax={1} yMin={0}
        svg={{stroke: appColors.green1, strokeWidth: 3}}
        contentInset={contentInset}
        >
          <Grid svg={{stroke: appColors.lightGray, strokeWidth: 1}}/>
        </LineChart>
      </View>
    </View>
  );
}
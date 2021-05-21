import { faBackward, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { fetchHabit, fetchHabits } from "../api/api";
import BackButton from "../components/BackButton";
import HabitProgressCard from "../components/HabitProgressCard";
import HabitProgressCardGraph from "../components/HabitProgressCardGraph";
import IconButtonTransparent from "../components/IconButtonTransparent";
import XButton from "../components/XButton";
import appColors from "../styles/Colors";
import styles from "../styles/Styles";

type props={
  route: any;
}

export default function HabitItemView(props: props) {
  const navigation = useNavigation();
  const route = props.route;

  // last 4 days (string representation)
  const [last5Days, setLast4Days] = useState<string[]>([]);

  useEffect(() => {

    // horribly messy, fix later

    const today = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let l5d: number[] = [];
    l5d.push(today.getUTCDay());
    l5d.push(new Date(today.setDate(today.getDate()-1)).getUTCDay())
    l5d.push(new Date(today.setDate(today.getDate()-1)).getUTCDay())
    l5d.push(new Date(today.setDate(today.getDate()-1)).getUTCDay())
    l5d.push(new Date(today.setDate(today.getDate()-1)).getUTCDay())
    let l5d_str: string[] = []
    for (let i of l5d) l5d_str.push(days[i])
    setLast4Days(l5d_str);
  }, [])

  const {data: habits, error} = useQuery('habits', fetchHabits);
  const {title, description} = habits?.filter((item) => {
    return item.id == route.params.id;
  })[0];

  // NOTE: fix later
  // const {data: habit, error} = useQuery('habits', function(){fetchHabit(route.params.id)});
  // const {title, description} = habit;

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerMultiline}>
          <BackButton/>
          <Text style={[styles.textBoxTitle, {marginTop: 12}]}>{title}</Text>
          <View style={{marginLeft: 'auto'}}>
            <IconButtonTransparent icon={faPencilAlt} color={appColors.lightGray} 
            onPress={() => {
              navigation.navigate("EditHabitItem", {id: route.params.id});
            }}
            />
          </View>
        </View>
        <Text style={[styles.textBox, {color: appColors.lighterGray, width: '94%',
          display: description ? 'flex' : 'none' }]}>{description}</Text>
        <View style={{height: 16}}/>

        {/* Completion Table (Week) */}
        <View style={[styles.card, {width: '96%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          {last5Days.map((item) => (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.pageTextBold}>{item}</Text>
              <Text style={styles.pageTextLight}>Hello</Text>
            </View>
          ))}
        </View>

        <HabitProgressCard rate={0.86} subText="Last 7 Days"/>
        <HabitProgressCard rate={0.73} subText="Last Month"/>
        <HabitProgressCardGraph data={[0.1, 0.4, 0.3, 0.6, 0.7]}/>
      </SafeAreaView>
  );
}
import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import HeaderBasic from "../components/HeaderBasic"
import { getTodoItem, setTodoItem } from "../data/UserDataLocal"
import appColors from "../styles/Colors"
import styles from "../styles/Styles"

type props = {
  route: any;
}

export default function TodoItemDatePickerView(props: props) {
  const navigation = useNavigation();
  const { listId, id } = props.route.params;

  return (
    <View style={styles.container}>
      <HeaderBasic title={"Choose Due Date"}/>
      <CalendarPicker
      textStyle={[styles.pageText, {color: appColors.lighterGray}]}
      todayBackgroundColor={appColors.midGray}
      selectedDayColor={appColors.green1}
      onDateChange={(date) => {
        console.log(`DATE: ${date}`)
        console.log(`CURRENT DATE: ${Date.now()}`)
        getTodoItem(listId, id).then((val: any) => {
          val.dueDate = (date.unix() as number * 1000).toString();
          setTodoItem(listId, val);
        });
      }}
      />
    </View>
  )
}
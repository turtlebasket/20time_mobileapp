import React from "react"
import { View } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import HeaderBasic from "../components/HeaderBasic"
import appColors from "../styles/Colors"
import styles from "../styles/Styles"

type props = {
}

export default function TodoItemDatePicker(props: props) {
  return (
    <View style={styles.container}>
      <HeaderBasic title={"Choose Due Date"}/>
      <CalendarPicker
      textStyle={[styles.pageText]}
      todayBackgroundColor={appColors.lightGray}
      selectedDayColor={appColors.green1}
      onDateChange={(date) => {
        console.log(`DATE: ${date}`)
        console.log(`CURRENT DATE: ${Date.now()}`)
      }}
      />
    </View>
  )
}
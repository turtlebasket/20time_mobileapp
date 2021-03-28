import React from "react"
import { Text, View } from "react-native"
import styles from "../styles/Styles"
import XButton from "./XButton"

/**
 * Basic header consisting of a title and an X button. Ideal for modal dialogs.
 * @param props 
 * @returns Header display
 */
export default function HeaderBasic(props: {title: string}) {
  return (
    <View style={styles.header}>
      <XButton/>
      <Text style={styles.pageTitleLarge}>{props.title}</Text>
    </View>
  )
}
import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function LoginView() {
  return (
    <>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.pageTitleLargeGreen}>Login</Text>
      </View>
      <View style={styles.cardInvis}>
        <TextInput 
        numberOfLines={1}
        style={styles.textBox} 
        placeholder={"Username"}
        placeholderTextColor={appColors.lightGray}
        selectionColor={appColors.green1}
        />
        <View style={styles.centered}>
          <TouchableNativeFeedback  onPress={() => {
            console.log('pressed');
          }}>
            <View style={[styles.textButton, {width: 140}]}>
              <Text style={styles.pageTextBold}>Login</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
    </>
  );
}
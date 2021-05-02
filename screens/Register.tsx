import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native';
import SingleLineTextBox from '../components/SingleLineTextBox';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function RegisterView(props: any) {

  const navigation = useNavigation();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const [registerUser, userRegistration] = useMutation(gql(`
  mutation {
    userCreateOne(name:"${name}" email:"${email}") {
      record{_id}
    }
  }
  `));

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.pageTitleLargeGreen}>Register</Text>
      </View>
      <View style={styles.cardInvis}>
        <SingleLineTextBox label={"Name"} placeholder={"Name"} onChangeText={(contents: any) => setName(contents)} />
        <SingleLineTextBox placeholder={"Email address"} onChangeText={(contents: any) => setEmail(contents)}/>
        <SingleLineTextBox placeholder={"Username"}onChangeText={(contents: any) => setUsername(contents)}/>
        <SingleLineTextBox placeholder={"Password"} secureTextEntry={true}onChangeText={(contents: any) => setPassword(contents)}/>
        <SingleLineTextBox placeholder={"Confirm password"} secureTextEntry={true}onChangeText={(contents: any) => setPassword2(contents)}/>
        <View style={styles.centered}>
          <TouchableNativeFeedback  onPress={() => {
            console.log(name, email, username, password, password2);
            if (password != password2) Alert.alert(
              'Passwords do not match.', 'Please try again.',
              [{text: 'OK'}], {cancelable: false}
            )
            else {
              registerUser().catch(e => {
                Alert.alert(
                  'Failed to register', 'This is likely due to a server error. Please try again.',
                  [{text: 'OK'}], {cancelable: false}
                )
              }).then((val) => {
                console.log(userRegistration)
                // console.log(JSON.stringify(userRegistration.data))
              })
              // AsyncStorage.setItem("userId", )
              // navigation.navigate("ProfileView");
            }
          }}>
            <View style={[styles.textButton, {width: 200, marginTop: 20}]}>
              <Text style={styles.pageTextBold}>Create Account</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
}
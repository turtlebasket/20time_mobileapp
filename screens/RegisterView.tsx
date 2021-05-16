import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Alert, InputAccessoryView, ScrollView, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import { View } from 'react-native';
import SingleLineTextBox from '../components/SingleLineTextBox';
import { supabase } from '../data/SupabaseUtil';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function RegisterView(props: any) {

  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  return (
    <ScrollView>
      <View style={styles.cardInvis}>
        <SingleLineTextBox placeholder={"Email address"} onChangeText={(contents: any) => setEmail(contents)}/>
        <SingleLineTextBox placeholder={"Password"} secureTextEntry={true} onChangeText={(contents: any) => setPassword(contents)}/>
        <SingleLineTextBox placeholder={"Confirm password"} secureTextEntry={true}onChangeText={(contents: any) => setPassword2(contents)}/>
        <View style={styles.centered}>
          <TouchableNativeFeedback  onPress={() => {
            if (password != password2) Alert.alert(
              'Passwords do not match.', 'Please try again.',
              [{text: 'OK'}], {cancelable: false}
            )
            else {
              supabase.auth.signUp({email: email, password: password}).then(({user, session, error}) => {
                if (!error && !user) {
                  Alert.alert("Account created!", "Check your inbox to verify your email.")
                } else {
                  Alert.alert("User already exists!", `Please try another email or log in normally as ${email}.`)
                }
              });
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
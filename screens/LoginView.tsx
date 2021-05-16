import { faFacebook, faGit, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { handleEmailLogin, handleOAuthLogin, supabase } from '../data/SupabaseUtil';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function LoginView() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <ScrollView>
      <View style={styles.cardInvis}>
        <Text style={styles.pageTitle}>Email Login</Text>
        <TextInput 
        numberOfLines={1}
        style={[styles.textBox, {marginTop: 10, marginBottom: 0}]} 
        placeholder={"Email address"}
        placeholderTextColor={appColors.lightGray}
        selectionColor={appColors.green1}
        onChangeText={(contents: any) => {setEmail(contents)}}
        />

        <TextInput 
        placeholder={"Password"} 
        placeholderTextColor={appColors.lightGray}
        style={[styles.textBox, {marginTop: 0, marginBottom: 10}]} 
        secureTextEntry={true} 
        onChangeText={(contents: any) => setPassword(contents)}
        />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableNativeFeedback  onPress={() => {
            handleEmailLogin(email, password).then(() => {
              navigation.navigate("Home")
            });
          }}>
            <View style={[styles.textButton, {flexDirection: 'row', maxWidth: 100,}]}>
              <Text style={styles.pageTextBold}>Log in</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback  onPress={() => {
            navigation.navigate("Register")
          }}>
            <View style={[styles.textButtonTransparent, {flexDirection: 'row', maxWidth: 280,}]}>
              <Text style={[styles.pageTextGreenBold, {textDecorationLine: 'underline'}]}>Register using email</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={{height: 20}}/>
        <Text style={styles.pageTitle}>Socials</Text>
        <View style={styles.centered}>

          <TouchableNativeFeedback  onPress={() => {
            handleOAuthLogin('google').then(() => {
              navigation.navigate("TodoLists");
            })
          }}>
            <View style={[styles.textButtonDark, {minWidth: 300, flexDirection: 'row', marginTop: 20}]}>
              <FontAwesomeIcon icon={faGoogle} color={appColors.white} size={24} />
              <Text style={[styles.pageTextBold, {marginLeft: 'auto', marginRight: 'auto'}]}>Sign in with Google</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback  onPress={() => {
            console.log('pressed');
          }}>
            <View style={[styles.textButtonDark, {minWidth: 300, flexDirection: 'row', marginTop: 20, }]}>
              <FontAwesomeIcon icon={faFacebook} color={appColors.white} size={24} />
              <Text style={[styles.pageTextBold, {marginLeft: 'auto', marginRight: 'auto'}]}>Sign in with Facebook</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback  onPress={() => {
            handleOAuthLogin('github').then(() => {
              navigation.navigate("TodoLists");
            })
          }}>
            <View style={[styles.textButtonDark, {minWidth: 300, flexDirection: 'row', marginTop: 20}]}>
              <FontAwesomeIcon icon={faGithub} color={appColors.white} size={24} />
              <Text style={[styles.pageTextBold, {marginLeft: 'auto', marginRight: 'auto'}]}>Sign in with GitHub</Text>
            </View>
          </TouchableNativeFeedback>

        </View>
      </View>
    </ScrollView>
    </>
  );
}
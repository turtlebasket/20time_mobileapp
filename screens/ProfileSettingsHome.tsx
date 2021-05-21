import { faArrowLeft, faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Alert, Text, TouchableNativeFeedback, View } from 'react-native';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { supabase } from '../data/SupabaseUtil';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function ProfileSettingsHome(props: any) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButtonTransparent icon={faArrowLeft} onPress={navigation.goBack}/>
        <Text style={styles.pageTitleLargeGreen}>Settings</Text>
      </View>
      <TouchableNativeFeedback onPress={() => {
        navigation.navigate("ProfileEditView");
      }}>
        <View style={[styles.textButtonDark, {width: '96%', marginBottom: 10}]}>
          <FontAwesomeIcon icon={faPencilAlt} color={appColors.lightGray} size={22}/>
          <Text style={[styles.pageTitleThin, {marginLeft: 'auto', marginRight: 'auto'}]}
          >Edit Profile</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => {
        Alert.alert("Log out?", "You will have to log in again.", 
        [
          {text: 'Cancel'},
          {text: 'Continue', onPress: () => {
            supabase.auth.signOut().then(() => {
              navigation.navigate("SignIn");
            })

          }}
        ]
        )
      }}>
        <View style={[styles.textButtonTransparent, {width: '96%', marginBottom: 10, borderWidth: 1, borderColor: appColors.red1}]}>
          <FontAwesomeIcon icon={faSignOutAlt} color={appColors.red1} size={22} />
          <Text style={[styles.pageTitleThin, {marginLeft: 'auto', marginRight: 'auto', color: appColors.red1}]}
          >Log Out</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
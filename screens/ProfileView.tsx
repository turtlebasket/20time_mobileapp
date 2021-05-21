import { faCog, faDoorOpen, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { appColors } from '../styles/Colors';
import styles from '../styles/Styles';
import { useNavigation } from '@react-navigation/core';
import IconButtonTransparent from '../components/IconButtonTransparent';
// import appColors from "../Colors";

export default function ProfileView(props: any) {

  const navigation = useNavigation();

  const iconSize = 22;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{marginLeft: 'auto'}}>
          <IconButtonTransparent icon={faCog} color={appColors.lightGray} iconSize={iconSize} onPress={() => {
            navigation.navigate("ProfileEditView");
          }}/>
        </View>
      </View>

      <ScrollView>
        <View style={styles.cardInvis}>
          <Image 
            source={{
              uri: "https://pce-coops.com/wp-content/uploads/2019/04/blank-profile-picture-973460_1280-e1561474127956.png"
            }}
            style={[styles.profilePictureLarge, {alignSelf: 'center'}]}
          />
        </View>

          <View style= {[styles.card, {minWidth: '96%'}]}>
            <Text style={styles.pageTitle}>{name}</Text>
            {/* add user tag at some point  */}
            {/* <Text style={styles.pageTextGreenBold}>@Michael</Text> */}
            <Text style={[styles.pageText, {display: bio ? 'flex' : 'none'}]}>{bio}</Text>
          </View>

          <HabitProgressCard rate={total} subText='All Time - All Habits'/>
          <HabitProgressCard rate={last_month} subText='Last Month - All Habits'/>

      </ScrollView>
    </SafeAreaView>

  );
}
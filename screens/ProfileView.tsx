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
              uri: "https://assets3.thrillist.com/v1/image/1299823/size/tl-horizontal_main/7-weird-stock-images-of-people-struggling-with-basic-cooking"
            }}
            style={[styles.profilePictureLarge, {alignSelf: 'center'}]}
          />
        </View>

        <View style= {styles.card}>
          <Text style={styles.pageTitle}>{}</Text>
          <Text style={styles.pageTextGreenBold}>@Michael</Text>
          <Text style={styles.pageText}>According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.</Text>
        </View>

        <View style= {styles.card}>
          <Text style={styles.pageTitle}>Habits</Text>
          <Text style={styles.pageText}>Exercise</Text>
          <Text style={styles.pageText}>Eat</Text>
          <Text style={styles.pageText}>Sleep</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
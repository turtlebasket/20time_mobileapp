import { faDoorOpen, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableNativeFeedback,
  TouchableOpacityBase,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { appColors } from '../styles/Colors';
import styles from '../styles/Styles';
import IconButtonCircle from '../components/IconButtonCircle';
import { useNavigation } from '@react-navigation/core';
import { gql, useQuery } from '@apollo/client';
import { GraphQLError } from 'graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import appColors from "../Colors";

export default function ProfileView(props: any) {

  const navigation = useNavigation();
  var id = "abc";

  AsyncStorage.getItem("userId").then((val) => {
    if (val != null) { id = val; }
  })
  let { data, refetch } = useQuery(gql(`
  query {
    userById(_id:"${id}")
  }
  `));
  console.log(JSON.stringify(data));
  // UNCOMMENT ONCE IT'S TIME TO WORK ON NETWORKING
  // if (data == undefined) {
  //   navigation.navigate("RegisterView")
  // }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        <View style={styles.cardInvis}>
          <View style={{marginLeft: 'auto'}}>
            <IconButtonCircle icon={faDoorOpen} onPress={() => {
              navigation.navigate("LoginView");
            }}/>
          </View>
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
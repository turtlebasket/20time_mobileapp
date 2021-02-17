import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
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
import { appColors } from '../Colors';
import TouchableCardBase from '../components/TouchableCard';
import styles from '../styles/Styles';
// import appColors from "../Colors";

class Profile extends Component {
  state = {
    testText: "Initialized Value",
    count: 0
  }

  options = {
    gestureDirection: "horizontal"
  }

  render() {
    return (

      <View style={styles.container}>

        <View style= {styles.card}>
          <Text style={styles.pageTitle}>Michael Profile (Demo)</Text>
          <Text style={styles.pageTextGreenBold}>@Michael</Text>
          <Text style={styles.pageText}>According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground.</Text>
        </View>

        <View style= {styles.card}>
          <Text style={styles.pageTitle}>Habits</Text>
          <Text style={styles.pageText}>Exercise</Text>
          <Text style={styles.pageText}>Eat</Text>
          <Text style={styles.pageText}>Sleep</Text>
        </View>
      </View>
    );
  }
}

export default Profile;
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
  Image
} from 'react-native';
import styles from "../styles/Styles"
import miscstyles from "../styles/MiscStyles"

class About extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={ require('../assets/reac.png')} style={miscstyles.topIconDecorator}/>
                <Text style={styles.pageTitle}>About</Text>
                <Text style={styles.pageText}>This is a thing.</Text>
            </View>
        );
    }
}

export default About;
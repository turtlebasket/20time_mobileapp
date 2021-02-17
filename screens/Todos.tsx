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
import TodoCard from '../components/TodoCard';
import appColors from '../Colors';

class Todos extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: appColors.black}}>
                <View style={styles.container}>
                    <View style={styles.cardInvis}>
                        <Text style={styles.pageTitle}>This is a habit!</Text>
                    </View>
                    <TodoCard title="test todo" description="test"/>
                </View>
            </ScrollView>
        );
    }
}

export default Todos;
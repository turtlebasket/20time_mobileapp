/* Shibe API GET-er Demo */

import React, { Component } from 'react';
import styles from '../styles/Styles';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import miscstyles from '../styles/MiscStyles';
import { ScrollView } from 'react-native';

class ShibeApi extends Component {
    state = {
        imageUrl: "",
    }

    constructor(props: any) {
        super(props);
        this.getRandomImageUrl();
    }

    getRandomImageUrl = () => {
        const randomImageUrls = [
            "http://shibe.online/api/shibes", 
            "http://shibe.online/api/cats", 
            "http://shibe.online/api/birds"
        ]
        let urlChoice = Math.floor(Math.random() * randomImageUrls.length);
        fetch(randomImageUrls[urlChoice], {method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({imageUrl: responseJson[0]});
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.pageTitle}>Shibe/Cat/Birb API Demo</Text>
                        <TouchableWithoutFeedback onPress={this.getRandomImageUrl}>
                            <Image source={{uri: this.state.imageUrl}} style={miscstyles.mainImage} />
                        </TouchableWithoutFeedback>
                        <TouchableNativeFeedback onPress={this.getRandomImageUrl}>
                            <Text style={styles.customButton}>Get New Image</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.getRandomImageUrl}>
                            <Text style={styles.customButton}>Do Another Thing</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.getRandomImageUrl}>
                            <Text style={styles.customButton}>Do A Third Thing</Text>
                        </TouchableNativeFeedback>
                        <Text style={styles.pageText}>lsadkfjalsdkjflaskdjflaskdfjalskdjfasldkfj
                            asldkfjalskdjfalsdkfjals
                            asldkjfslaf
                            lsadkfjalsdkjflaskdjflaskdfjalskdjfasldkfjsdlfkjalsdf
                            laskjdf
                            asdfj
                            kjas
                            dfkja
                            sldfj
                            asdjfas
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default ShibeApi;
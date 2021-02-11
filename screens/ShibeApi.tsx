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
            <View style={styles.container}>
                <Text style={styles.pageTitle}>Shibe/Cat/Birb API Demo</Text>
                <TouchableWithoutFeedback onPress={this.getRandomImageUrl}>
                    <Image source={{uri: this.state.imageUrl}} style={miscstyles.mainImage} />
                </TouchableWithoutFeedback>
                <TouchableNativeFeedback onPress={this.getRandomImageUrl}>
                    <Text style={styles.customButton}>Get New Image</Text>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

export default ShibeApi;
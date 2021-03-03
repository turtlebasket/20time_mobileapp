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
import '../data/UserData';
import { ScrollView } from 'react-native';
import { getByGuid, setByGuid } from '../data/UserData';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../Colors';

class ConceptDemo extends Component {
  state = {
    imageUrl: "",
    newItem: {
      id: "",
      name: ""
    },
    listOfItems: [
      {
        id: "12345",
        name: "Thing One"
      },
      {
        id: "67890",
        name: "Thing Two"
      },
      {
        id: "20394",
        name: "Thing Three"
      },
      {
        id: "31204",
        name: "Thing One"
      },
    ]
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

  changeNewItemId = (id: string) => {
    this.setState({newItem: id})
  }

  render() {
    const {imageUrl, listOfItems, newItem} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.cardInvis}>
            <Text style={styles.pageTitleLargeGreen}>Concept Demo</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.pageTitle}>getter/setter by GUID demo</Text>
            <Text style={styles.pageText}>{getByGuid(listOfItems, "67890").name}</Text>
            <Text style={styles.pageText}>{JSON.stringify(listOfItems)}</Text>
            <TextInput 
              style={styles.textBox} 
              placeholder={"GUID"} 
              placeholderTextColor={appColors.lightGray}
              selectionColor={appColors.green1}
              defaultValue={newItem.id}
              onChangeText={(text) => this.setState({newItem: {...newItem, id: text}})}
            />
            <TextInput 
              style={styles.textBox} 
              placeholder={"name"} 
              placeholderTextColor={appColors.lightGray}
              selectionColor={appColors.green1}
              defaultValue={newItem.name}
              onChangeText={(text) => {
                this.setState({newItem: {...newItem, name: text}});
                // console.log(JSON.stringify(this.state))
              }}
            />
            <TouchableNativeFeedback
              onPress={() => {
                setByGuid(listOfItems, newItem)
              }}
            ><Text style={styles.customButton}>Do a thing</Text></TouchableNativeFeedback>
          </View>

          <View style={styles.card}>
            <Text style={styles.pageTitle}>Shibe/Cat/Birb API Demo</Text>
            <TouchableWithoutFeedback onPress={this.getRandomImageUrl}>
              <Image source={{uri: imageUrl}} style={miscstyles.mainImage} />
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

export default ConceptDemo;
/* Shibe API GET-er Demo */

import React, { Component } from 'react';
import styles from '../styles/Styles';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import miscstyles from '../styles/MiscStyles';
import '../data/UserData';
import { ScrollView } from 'react-native';
import { getCurrentUserId, getByGuid, getTodoLists, getAllUsers, setByGuid, setTodoItem, setTodoList, jsonDiffKeys } from '../data/UserData';
import { TextInput } from 'react-native-gesture-handler';
import appColors from '../styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

class ConceptDemo extends Component {
  state = {
    imageUrl: "",
    newItem: {
      id: "",
      name: ""
    },
    newUser: {
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
    const {imageUrl, listOfItems, newItem, newUser} = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps={true}>
        <View style={styles.container}>


          <View style={styles.cardInvis}>
            <TouchableNativeFeedback
            onPress = {() => {
              Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                  {
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed')
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
            }}
            >
              <Text style={[styles.pageTitle, {backgroundColor: appColors.green1, padding: 10}]}
              >PRESSME</Text>
            </TouchableNativeFeedback>
          </View>


          <View style={styles.cardInvis}>
            <Text style={styles.pageTitleLargeGreen}>Concept Demo</Text>
          </View>

          <View style={[styles.card, {width: '96%'}]}>
            <Text style={styles.pageTitle}>CREATE/EDIT USER</Text>
            <TextInput 
              style={styles.textBox} 
              placeholder={"Name"} 
              placeholderTextColor={appColors.lightGray}
              selectionColor={appColors.green1}
              defaultValue={newItem.id}
              onChangeText={(text) => this.setState({newUser: {...newUser, name: text}})}
            />
            <TouchableNativeFeedback
              onPress={() => {
                // var newUUID = uuidv4()

                var newUUID = '1234'
                var newVal: any = []
                AsyncStorage.getItem('users').then((val: string | null) => {
                  const valObj: any = val != null ? JSON.parse(val) : [];
                  newVal = setByGuid(
                    valObj, 
                    {
                      id: newUUID, 
                      name: this.state.newUser.name,
                    })
                  console.log(`NEWVAL ${JSON.stringify(newVal)}`)
                  AsyncStorage.setItem('users', JSON.stringify(newVal))
                  AsyncStorage.setItem('currentUser', newUUID)
                })
                
              }}
            ><Text style={styles.customButton}>Create User</Text></TouchableNativeFeedback>
          </View>

          <View style={[styles.card, {width: '96%'}]}>
            <Text style={styles.pageTitle}>Get/Set Local Data</Text>
            <TouchableNativeFeedback
              onPress={() => {
                // remove all users
                AsyncStorage.removeItem('users')
              }}
            ><Text style={styles.customButton}>Clear Users</Text></TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                // get current user
                AsyncStorage.getItem('currentUser').then((val) => {
                  console.log(`CURRENT USER --- ${val}`)
                })
                // get all users
                AsyncStorage.getItem('users').then((val) => {
                  console.log(`USERS --- ${val}`)
                })
              }}
            ><Text style={styles.customButton}>List Users</Text></TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setTodoList({id: 'lasdkfjdsfdf', title: 'Chores', description: 'test'})
              }}
            ><Text style={styles.customButton}>Create/Set Todo List</Text></TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setTodoItem('lasdkfjdsfdf', {id: 'lasdkfjasldf2', title: 'Do another thing'}).catch((e: any) => {console.log(e)})
              }}
            ><Text style={styles.customButton}>Create/Set Todo Item</Text></TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                // jsonDiffKeys({id: "12345", title: "thingy1"}, {id: "12345", title: "thingy2"})
                getTodoLists().then(val => console.log(val))
              }}
            ><Text style={styles.customButton}>getTodoLists() Demo</Text></TouchableNativeFeedback>
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
                this.setState({newItem: {...newItem}, name: text});
                console.log(JSON.stringify(this.state))
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
/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { View } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoEditorProps {
  id: string;
  navigation: any;
  // onSave?: any;
}

interface TodoEditorState {
  title: string;
  description: string;
}

export class TodoEditView extends Component<TodoEditorProps, TodoEditorState> {

  constructor(props: any) {
    super(props);
    this.state={
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    var currentUser: ""
    AsyncStorage.getItem(this.props.id).then((value) => {
    })
  }

  render() {

    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={[styles.header, {}]}>
          <TextInput // title
            style={[styles.textBoxTitle, {minWidth: 70}]}
            multiline={false}
            numberOfLines={1}
            placeholder={"Title..."}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
          />
          <View style={{marginLeft: 'auto'}}>
            <IconButtonCircle icon={faSave} onPress={() => {
              navigation.navigate("Todos")
            }}/>
          </View>
        </View>

        <TextInput // description
          style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%'}]}
          multiline={true}
          placeholder={"Description..."}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
        />
      </View>
    );
  }
}

export default function TodoEditViewWrapped(props: any) {
  const navigation = useNavigation();
  return <TodoEditView {...props} navigation={navigation}/>;
}
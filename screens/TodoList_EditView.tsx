/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { View } from 'react-native';

import { NavigationProp, useLinkBuilder, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import uuid from 'uuid';
import { getTodoList } from '../data/UserData';

interface TodoListEditorProps {
  id: string | null;
  navigation: any;
  // onSave?: any;
}

interface TodoListEditorState {
  id: string
  title: string;
  description: string;
}

export class TodoListEditView extends Component<TodoListEditorProps, TodoListEditorState> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({id: this.props.id === null ? uuid.v4() as string : this.props.id,});
    getTodoList(this.state.id).then((val) => {
      this.setState({title: val.title, description: val.description})
    })
  }

  render() {

    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={[styles.header, {}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            navigation.navigate('TodoItems')
          }} />
          <TextInput // title
            style={[styles.textBoxTitle, {minWidth: 90}]}
            multiline={false}
            numberOfLines={1}
            placeholder={"Title"}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
          />
          <View style={{marginLeft: 'auto'}}>
            <IconButtonCircle icon={faSave} onPress={() => {
              navigation.navigate("TodoItems")
            }}/>
          </View>
        </View>

        <TextInput // description
          style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%'}]}
          multiline={true}
          placeholder={"Description"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
        />
      </View>
    );
  }
}

export default function TodoListEditViewWrapped(props: any) {
  const navigation = useNavigation();
  const route = useRoute();
  return <TodoListEditView {...props} navigation={navigation}/>;
}
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
import { faArrowLeft, faRoute, faSave } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { genUUIDTime, getTodoList, setTodoList } from '../data/UserData';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface TodoListEditorProps {
  id: string;
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


    // TODO: MOVE THIS TO COMPONENTDIDMOUNT

    let uuid: string = props.id ? props.id : uuidv4();
    let title: string = "";
    let description: string = "";

    getTodoList(uuid).then((val) => {
      title = val.title;
      description = val.description;
    }).catch(e => {return})

    this.state={
      id: uuid,
      title: title,
      description: description,
    }

  }

  // componentDidMount() {
  //   let uuid: string = this.props.id ? this.props.id : uuidv4();
  //   this.setState({id: uuid});
  //   getTodoList(uuid).then((val) => {
  //     this.setState({
  //       title: val.title as string,
  //       description: val.description as string,
  //     })
  //   }).catch(e => {return})
  //   console.log(this.state);
  // }

  render() {

    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={[styles.header, {}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            navigation.navigate('TodoLists')
          }} />
          <TextInput // title
            autoFocus={true}
            style={[styles.textBoxTitle, {minWidth: 90}]}
            multiline={false}
            numberOfLines={1}
            placeholder={"Title"}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
            onChangeText={(contents) => {
              this.setState({title: contents})
            }}
          />
          <View style={{marginLeft: 'auto'}}>
            <IconButtonCircle icon={faSave} onPress={() => {
              // console.log(`STATE ${JSON.stringify(this.state)}`)
              const {id, title, description} = this.state;
              setTodoList({
                id: id,
                title: title,
                description: description
              })
              navigation.navigate("TodoLists")
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
          onChangeText={(contents) => {
            this.setState({description: contents})
          }}
        />
      </View>
    );
  }
}

export default function TodoListEditViewWrapped(props: any) {
  const navigation = useNavigation();
  // const route = useRoute();
  const route = props.route;
  const id = route.params.id ? null : route.params.id;
  return <TodoListEditView {...props} navigation={navigation} id={id}/>;
}
/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { Alert, TouchableNativeFeedback, View } from 'react-native';

import { NavigationProp, useLinkBuilder, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faEye, faEyeSlash, faRoute, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { genUUIDTime, getTodoList, removeTodoItem, removeTodoList, setTodoList } from '../data/UserData';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface TodoListEditorProps {
  id: string;
  navigation: any;
}

interface TodoListEditorState {
  id: string
  title: string;
  description: string;
  public: boolean;
}

export class TodoListEditView extends Component<TodoListEditorProps, TodoListEditorState> {

  constructor(props: any) {
    super(props);
  }

  state={
    id: "",
    title: "",
    description: "",
    public: false,
  }

  componentDidMount() {
    let uuid = this.props.id ? this.props.id : uuidv4()
    this.setState({id: uuid});

    getTodoList(uuid).then((val) => {
      this.setState({title: val.title, description: val.description, public: val.public});
    }).catch(e => {return})

  }

  render() {

    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={[styles.header, {}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            navigation.goBack();
            // navigation.navigate('TodoLists')
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
            value={this.state.title}
            onChangeText={(contents) => {
              this.setState({title: contents})
              setTodoList({id: this.state.id, title: contents})
            }}
          />
          <View style={{marginLeft: 'auto'}}>
            {/* GET RID OF SAVE BUTTON FOR NOW
            <IconButtonCircle icon={faSave} onPress={() => {
              // console.log(`STATE ${JSON.stringify(this.state)}`)
              const {id, title, description} = this.state;
              setTodoList({
                id: id,
                title: title,
                description: description,
                // public: this.state.public
              })
              navigation.navigate("TodoLists")
            }}/>*/}
            <IconButtonTransparent 
            size={26}
            icon={this.state.public ? faEye : faEyeSlash} 
            color={this.state.public ? appColors.lighterGray : appColors.lightGray} 
            onPress={() => {
              const newPub = !this.state.public
              this.setState({public: newPub})
              setTodoList({id: this.state.id, public: newPub})
              getTodoList(this.state.id).then((val) => {
                console.log(val)
              })
            }}
            />
          </View>

          <IconButtonTransparent 
          size={26}
          icon={faTrash} 
          color={appColors.red1} 
          onPress={() => {
            Alert.alert(
              'Delete list?',
              'This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log("cancelled")
                },
                {
                  text: 'OK',
                  onPress: () => {
                    removeTodoList(this.state.id).then(() => {
                      navigation.goBack();
                    });
                  }
                }
              ],
              {cancelable: false}
            )
          }}
          />
        </View>

        <TextInput // description
          style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%', color: appColors.lighterGray}]}
          multiline={true}
          placeholder={"Description"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.lightGray}
          textAlign={'left'}
          value={this.state.description}
          onChangeText={(contents) => {
            this.setState({description: contents})
            setTodoList({id: this.state.id, description: contents})
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
  return <TodoListEditView {...props} id={route.params.id} navigation={navigation}/>;
}
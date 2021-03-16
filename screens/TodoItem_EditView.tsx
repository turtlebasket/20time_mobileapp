/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { getTodoItem, getTodoList, removeTodoItem, setTodoItem } from '../data/UserData';
import { v4 as uuidv4 } from 'uuid';

interface TodoEditorProps {
  id: string;
  listId: string;
  navigation: any;
  // onSave?: any;
}

interface TodoEditorState {
  id: string;
  title: string;
  description: string;
}

export class TodoEditView extends Component<TodoEditorProps, TodoEditorState> {

  constructor(props: any) {
    super(props);
    this.state={
      id: "",
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    let uuid = this.props.id ? this.props.id : uuidv4();
    this.setState({id: uuid});
    console.log(`UUID ${uuid}`)
    getTodoItem(this.props.listId, uuid).then(val => {
      console.log(`VAL ${val}`);
      this.setState({title: val.title, description: val.description})
    });
  }

  render() {

    const { navigation } = this.props

    return (
      <View style={styles.container}>

        <View style={[styles.header, {}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            // navigation.navigate('TodoItems')
            navigation.goBack();
          }} />
          <TextInput // title
            style={[styles.textBoxTitle, {minWidth: 90}]}
            multiline={false}
            numberOfLines={1}
            placeholder={"Title"}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
            value={this.state.title}
            onChangeText={(contents) => {
              this.setState({title: contents});
              setTodoItem(this.props.listId, {id: this.state.id, title: contents});
            }}
          />

          <View style={{marginLeft: 'auto'}}>
            <IconButtonTransparent 
            size={26}
            icon={faTrash} 
            color={appColors.red1} 
            onPress={() => {
              Alert.alert(
                'Delete item?',
                'This action cannot be undone.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log("cancelled")
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      removeTodoItem(this.props.listId, this.state.id).then(() => {
                        navigation.navigate("TodoItems");
                      });
                    }
                  }
                ],
                {cancelable: false}
              )
            }}
            />
          </View>
        </View>

          {/* DELETE SAVE BUTTON FOR NOW
          <View style={{marginLeft: 'auto'}}>
            <IconButtonCircle icon={faSave} onPress={() => {
              setTodoItem(this.props.listId, 
                {
                  id: this.state.id,
                  title: this.state.title,
                  description: this.state.description,
                }
              ).then(() => {
                navigation.navigate("TodoItems")
              });
            }}/>
          </View>
        </View> */}

        <TextInput // description
          style={[styles.textBox, {minHeight: 120, maxHeight: 120, width: '94%'}]}
          multiline={true}
          placeholder={"Description"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
          value={this.state.description}
          onChangeText={(contents) => {
            this.setState({description: contents});
            setTodoItem(this.props.listId, {id: this.state.id, description: contents});
          }}
        />
      </View>
    );
  }
}

export default function TodoEditViewWrapped(props: any) {
  const navigation = useNavigation();
  const route = props.route;
  return <TodoEditView {...props} 
  id={route.params.id} 
  listId={route.params.listId}
  navigation={navigation}/>;
}
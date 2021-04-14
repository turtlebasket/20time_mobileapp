/* Screen where user can edit a todo.
 * 
 **/
import styles from '../styles/Styles'
import appColors from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import IconButtonCircle from '../components/IconButtonCircle';
import { faArrowLeft, faCalendar, faCalendarAlt, faCalendarDay, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { getTodoItem, getTodoList, removeTodoItem, setTodoItem } from '../data/UserData';
import { v4 as uuidv4 } from 'uuid';
import { Text } from 'react-native-svg';
import SelectValueButtonTransparent from '../components/SelectValueButtonTransparent';
import XButton from '../components/XButton';

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
  dueDate?: string;
  complete: boolean;
  dateColor: string;
}

export class TodoEditView extends Component<TodoEditorProps, TodoEditorState> {

  constructor(props: any) {
    super(props);
    this.state={
      id: "",
      title: "",
      description: "",
      complete: false,
      dateColor: appColors.lighterGray,
    };
  }

  componentDidMount() {
    let uuid = this.props.id ? this.props.id : uuidv4();
    this.setState({id: uuid});
    // console.log(`UUID ${uuid}`)
    getTodoItem(this.props.listId, uuid).then(val => {
      var complete: boolean = val.complete ? val.complete : false;
      this.setState({title: val.title, description: val.description, complete: complete, dueDate: val.dueDate})
    }).then(() => {
      this.updateDueDateColor();
    });
  }

  wantsToRefresh = this.props.navigation.addListener('focus', () => {
    this.refreshFromStorage();
  })

  refreshFromStorage() {
    getTodoItem(this.props.listId, this.state.id).then(val => {
      this.setState({title: val.title, description: val.description, complete: val.complete, dueDate: val.dueDate})
    }).then(() => {
      this.updateDueDateColor();
    });
  }

  updateDueDateColor() {
    console.log("UPDATING")
    const {dueDate, complete} = this.state;

    // @ts-ignore
    const dateObj = new Date(parseInt(dueDate));
    const today = new Date();

    if (typeof dueDate != 'undefined') {
      if (dateObj.getDate() == today.getDate() && dateObj.getMonth() == today.getMonth() && dateObj.getFullYear() == today.getFullYear()) { // if dueDate is today
        // setDateColor(appColors.green1);
        this.setState({dateColor: appColors.green1})
      }
      else if (dateObj < today) { // if dueDate was earlier than today
        // setDateColor(appColors.red1);
        this.setState({dateColor: appColors.red1})
      }
      else {
        // setDateColor(appColors.lighterGray);
        this.setState({dateColor: appColors.lighterGray})
      }
    }
  }

  render() {

    const { navigation, listId } = this.props
    const {id, title, description, complete} = this.state

    // @ts-ignore
    const dateObj = new Date(parseInt(this.state.dueDate))

    return (
      <View style={styles.container}>

        <View style={[styles.headerMultiline, {}]}>
          <XButton/>
          <TextInput // title
            // must set both minwidth & width for some reason
            style={[styles.textBoxTitle, {minWidth: 170, width: 210}]} 
            multiline
            placeholder={"Title"}
            placeholderTextColor={appColors.lightGray}
            selectionColor={appColors.green1}
            textAlign={'left'}
            value={this.state.title}
            onChangeText={(contents: any) => {
              this.setState({title: contents});
              setTodoItem(this.props.listId, {id: this.state.id, title: contents, complete: this.state.complete});
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
                      removeTodoItem(this.props.listId, this.state.id).finally(() => {
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
          ref={React.createRef()}
        />

        <SelectValueButtonTransparent icon={faCalendarDay} 
        text={this.state.dueDate ? `Due ${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}` : "Choose Due Date"} 
        color={this.state.dateColor}
        filled={typeof this.state.dueDate != 'undefined'}
        onPressSelect={() => {
          navigation.navigate("PickDateTodoItem", {listId: listId, id: id});
          
        }}
        onPressCancel={() => {
          Alert.alert(
            'Clear due date?',
            'This action cannot be undone.',
            [
              {
                text: 'Cancel',
                onPress: () => {/* do nothing */}
              },
              {
                text: 'OK',
                onPress: () => {
                  setTodoItem(listId, {id: id, description: description, complete: complete, dueDate: undefined})
                  this.setState({dueDate: undefined});
                }
              }
            ],
            {cancelable: false}
          )
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
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
  TouchableHighlightBase,
  Alert,
} from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import styles from "../styles/Styles"
import TodoItemCard from '../components/TodoItemCard';
import appColors from '../styles/Colors';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { faArrowLeft, faCheckDouble, faCocktail, faCog, faPencilAlt, faPlus, faPlusCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import IconButtonCircle from '../components/IconButtonCircle';
import IconButtonTransparent from '../components/IconButtonTransparent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSelectedTodos, getTodoList, getTodoLists, setTodoList } from '../data/UserData';
import TodoCard from '../components/TodoCardOld';

interface ListViewProps {
  listId: string;
  id: string;
  navigation: any;
  // navigation: NavigationProp<any,any>
}

interface ListViewState {
  todoName: string;
  todoItems: any[]; // accept list of any type
}

export class TodoListView extends Component<ListViewProps, ListViewState> {

  state = {
    newTodo: {
      id: "",
      title: "",
      description: ""
    },
    todoName: "",
    todoItems: []
  };

  constructor(props: any) {
    super(props);
  }

  wantsToRefresh = this.props.navigation.addListener('focus', () => {
    this.refreshFromStorage();
  })

  componentDidMount() {
    this.refreshFromStorage();
  }

  refreshFromStorage() {
    // console.log("REFRESH FROM STORAGE")
    try {
      getTodoList(this.props.id).then((val: any) => {
        this.setState({todoName: val.title, todoItems: val.todoItems});
      })
    } catch {}
  }
  
  render() {

    const { todoItems } = this.state;
    const { navigation } = this.props;

    type TodoItem = {
      id: string;
      title: string;
      description: string;
      dueDate: string;
      complete?: boolean;
      selected?: boolean;
    }

    const renderItem = ({ item, index, drag, isActive }: RenderItemParams<TodoItem>) => (
      <View>
        <TodoItemCard
          listId={this.props.id}
          id={item.id}
          title={item.title} 
          description={item.description} 
          dueDate={item.dueDate}
          selected={isActive}
          complete={item.complete}
          dragBehavior={drag}
          navigation={navigation}
          refreshFromStorage={() => {this.refreshFromStorage(); this.render();}} 
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.container} >

        <View style={[styles.header, 
        {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            navigation.navigate("TodoLists")
          }} />
          <Text style={[styles.pageTitleLargeGreen, {width: 160}]} numberOfLines={1}
          >{this.state.todoName}</Text>
          {/* Snap all of these to the right */}
          <View style={{marginLeft: 'auto'}}> 
            <IconButtonTransparent icon={faPencilAlt} color={appColors.lightGray} onPress={() => {
              navigation.navigate("EditTodoList", {id: this.props.id})
            }}/>
          </View>
          <IconButtonTransparent icon={faTasks} color={appColors.lightGray} onPress={() => {
            Alert.alert(
              'Clear all completed tasks?',
              'This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log("cancelled")
                },
                {
                  text: 'OK',
                  onPress: () => {
                    clearSelectedTodos(this.props.id).then(() => {
                      this.refreshFromStorage();
                    });
                  }
                }
              ],
              {cancelable: false}
            )
          }}/>
          <IconButtonCircle icon={faPlus} onPress={() => {
            navigation.navigate("EditTodoItem", {id: null, listId: this.props.id})
          }} />
        </View>

        {/* ADD LATER 
        <Text style={[styles.pageTitle, 
        {color: appColors.lightGray, display: this.state.todoItems.length > 0 ? 'none' : 'flex'}]}>
        Nothing here yet. Add some todos!</Text> */}

        <DraggableFlatList keyboardShouldPersistTaps={"always"}
          style={{
            width: "100%",
            minWidth: "100%",
          }}
          dragItemOverflow={false}
          data={todoItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => {
            this.setState({todoItems: data})
            setTodoList({id: this.props.id, todoItems: data})
          }}
        />

      </SafeAreaView>
    );

  }
}

export default function TodoListViewWrapped(props: any) {
  const navigation = useNavigation();
  // const route = useRoute();
  const route = props.route;
  return <TodoListView {...props} id={route.params.id} listId={route.params.listId} navigation={navigation}/>;
}

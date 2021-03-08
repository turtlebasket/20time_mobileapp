import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
} from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import styles from "../styles/Styles"
import TodoItemCard from '../components/TodoItemCard';
import appColors from '../styles/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { faArrowLeft, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import IconButtonCircle from '../components/IconButtonCircle';
import IconButtonTransparent from '../components/IconButtonTransparent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodoList, getTodoLists } from '../data/UserData';

interface ListViewProps {
  id: string;
  navigation: any;
  // navigation: NavigationProp<any,any>
}

interface ListViewState {
  todoName: string;
  todos: any[]; // accept list of any type
}

export class TodoListView extends Component<ListViewProps, ListViewState> {

  state = {
    newTodo: {
      id: "",
      title: "",
      description: ""
    },
    todoName: "",
    todos: []
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    getTodoList(this.props.id).then((val: any) => {
      this.setState({todoName: val.title, todos: val.todos});
    })
  }

  render() {

    const { todos } = this.state;

    type TodoItem = {
      id: string;
      title: string;
      description: string;
      selected?: boolean;
    }

    // const renderItem = ({ item, index, drag, isActive }: RenderItemParams<TodoItem>) => (
    const renderItem = ({ item, index, drag, isActive }: RenderItemParams<TodoItem>) => (
      <View>
        <TodoItemCard
          title={item.title} 
          description={item.description} 
          selected={isActive}
          dragBehavior={drag}
        />
      </View>
    );

    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>

        <View style={[styles.header, 
        {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <IconButtonTransparent icon={faArrowLeft} onPress={() => {
            navigation.navigate("TodoLists")
          }} />
          <Text style={styles.pageTitleLargeGreen}>{this.state.todoName}</Text>
          {/* Snap all of these to the right */}
          <View style={{marginLeft: 'auto'}}> 
            <IconButtonCircle icon={faPlus} onPress={() => {
              navigation.navigate("EditTodoItem", {id: '123'})
            }} />
          </View>
        </View>

        <DraggableFlatList
          style={{
            width: "100%",
            minWidth: "100%",
          }}
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => this.setState({todos: data})}
        />

      </SafeAreaView>
    );

  }
}

export default function TodoListViewWrapped(props: any) {
  const navigation = useNavigation();
  return <TodoListView {...props} navigation={navigation}/>;
}

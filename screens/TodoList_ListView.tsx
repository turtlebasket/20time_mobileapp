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
import appColors from '../styles/Colors';
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { faArrowLeft, faCalendarPlus, faFolderPlus, faListUl, faPlus, faPlusCircle, faRoute } from '@fortawesome/free-solid-svg-icons';
import IconButtonCircle from '../components/IconButtonCircle';
import IconButtonTransparent from '../components/IconButtonTransparent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllUsers, getTodoList, getTodoLists, setTodoLists } from '../data/UserData';
import TodoListCard from '../components/TodoListCard';
import TodoListCardSeparator from '../components/TodoListCardSeparator';

interface AllViewProps {
  // userId: string;
  navigation: any;
  // navigation: NavigationProp<any,any>
}

interface AllViewState {
  todoLists: any[]; // accept list of any type
}

class TodoAllView extends Component<AllViewProps, AllViewState> {

  constructor(props: any) {
    super(props);
    this.state={
      todoLists: []
    }
  }

 wantsToRefresh = this.props.navigation.addListener('focus', () => {
    this.refreshFromStorage();
  })


  componentDidMount() {
    this.refreshFromStorage();
  }

  refreshFromStorage() {
    getTodoLists().then((val) => {
      this.setState({todoLists: val})
    })
  }

  render() {

    // getAllUsers().then((val) => {
    //   console.log(`render loop | storage: ${JSON.stringify(val)}`)
    // })

    const { navigation } = this.props;
    const { todoLists } = this.state;

    // Display-only; don't need to show contents
    type TodoList = {
      id: string;
      title: string;
      description: string;
      public: boolean;
    }

    const renderItem = ({item, index, drag, isActive}: RenderItemParams<TodoList>) => (
      <View>
        <TodoListCard 
          navigation={navigation}
          id={item.id}
          title={item.title} 
          description={item.description} 
          public={item.public}
          selected={isActive} 
          dragBehavior={drag} 
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>

        <View style={[styles.header, 
        {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <Text style={styles.pageTitleLargeGreen}>To Do</Text>
          {/* Snap all of these to the right */}
          <View style={{marginLeft: 'auto'}}> 
            <IconButtonCircle icon={faFolderPlus} onPress={() => {
              navigation.navigate("EditTodoList", {id: null})
            }} />
          </View>
        </View>

        <DraggableFlatList
          style={{
            width: "100%",
            minWidth: "100%",
          }}
          data={todoLists}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => {
            this.setState({todoLists: data})
            setTodoLists(data)
          }}
          ItemSeparatorComponent={TodoListCardSeparator}
        />

      </SafeAreaView>
    );
  }
}

export default function TodoAllViewWrapped(props: any) {
  const route = useRoute();
  const navigation = useNavigation();
  return <TodoAllView {...props} navigation={navigation}/>;
}

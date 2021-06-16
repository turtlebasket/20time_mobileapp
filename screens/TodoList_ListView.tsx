import React, { Component, useEffect, useState } from 'react';
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
import { getAllUsers, getTodoList, getTodoLists, setTodoLists } from '../data/UserDataLocal';
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

export default function TodoAllView() {
  
  const navigation = useNavigation();

  type TodoList = {
    id: string;
    title: string;
    description: string;
    public: boolean;
  }

  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

 const wantsToRefresh = navigation.addListener('focus', () => {
   refreshFromStorage();
  })

  useEffect(() => {
    refreshFromStorage();
  }, [])

  const refreshFromStorage = () => {
    getTodoLists().then((val) => {
      setTodoLists(val);
    })
  }

  // getAllUsers().then((val) => {
  //   console.log(`render loop | storage: ${JSON.stringify(val)}`)
  // })

  // Display-only; don't need to show contents
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
          setTodoLists(data)
        }}
        ItemSeparatorComponent={TodoListCardSeparator}
      />

    </SafeAreaView>
  );
}

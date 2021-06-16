import React, { Component, useEffect, useState } from 'react';
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
import { clearSelectedTodos, getTodoList, getTodoLists, setTodoList } from '../data/UserDataLocal';

type ListViewProps = {
  listId: string;
  id: string;
}

export default function TodoListView(props: any) {

  const navigation = useNavigation();
  const { route } = props;
  const { id, listId } = route.params;

  const [todoName, setTodoName] = useState("");
  const [todoItems, setTodoItems] = useState<any[]>();

  const wantsToRefresh = navigation.addListener('focus', () => {
    refreshFromStorage();
  })
  
  useEffect(() => {
    refreshFromStorage();
  }, [])

  const refreshFromStorage = () => {
    // console.log("REFRESH FROM STORAGE")
    try {
      getTodoList(id).then((val: any) => {
        setTodoName(val.title);
        setTodoItems(val.todoItems);
      })
    } catch {}
  }
  
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
        listId={id}
        id={item.id}
        title={item.title} 
        description={item.description} 
        dueDate={item.dueDate}
        selected={isActive}
        complete={item.complete}
        dragBehavior={drag}
        navigation={navigation}
        refreshFromStorage={() => {refreshFromStorage(); }} 
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
        >{todoName}</Text>
        {/* Snap all of these to the right */}
        <View style={{marginLeft: 'auto'}}> 
          <IconButtonTransparent icon={faPencilAlt} color={appColors.lightGray} onPress={() => {
            navigation.navigate("EditTodoList", {id: id})
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
                  clearSelectedTodos(id).then(() => {
                    refreshFromStorage();
                  });
                }
              }
            ],
            {cancelable: false}
          )
        }}/>
        <IconButtonCircle icon={faPlus} onPress={() => {
          navigation.navigate("EditTodoItem", {id: null, listId: id})
        }} />
      </View>

      {/* ADD LATER 
      <Text style={[styles.pageTitle, 
      {color: appColors.lightGray, display: todoItems.length > 0 ? 'none' : 'flex'}]}>
      Nothing here yet. Add some todos!</Text> */}

      <DraggableFlatList keyboardShouldPersistTaps={"always"}
        style={{
          width: "100%",
          minWidth: "100%",
        }}
        dragItemOverflow={false}
        data={todoItems as any[]}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => {
          setTodoItems(data)
          setTodoList({id: id, todoItems: data})
        }}
      />

    </SafeAreaView>
  );

}

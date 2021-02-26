import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  Image,
  FlatList,
} from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import styles from "../styles/Styles"
import miscstyles from "../styles/MiscStyles"
import TodoCardV2 from '../components/TodoCard';
import appColors from '../Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

interface ListViewState {
  todoName: string;
  todos: any[]; // accept list of any type
  dragging: boolean;
  draggingIndex: number;
}

class ListView extends Component<{}, ListViewState> {

  state = {
    dragging: false,
    draggingIndex: -1,
    todoName: "Chores",
    todos: [
      {id: "abc", title: "Push out the trash", description: "Very difficult, be careful"},
      {id: "def", title: "Do the dishes", description: "Clean"},
      {id: "ghi", title: "Load the dishwasher", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "123", title: "Fold the laundry", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "456", title: "Do the dishes", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "asdf", title: "Get Help", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "jwoef", title: "Do the dishes1", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "0239ri", title: "Do the dishes2", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "jl23j", title: "Do the dishes3", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "j23ori", title: "Do the dishes4", description: "Cleansadfjlaskdfjlsakjdfal"},
      {id: "2j3oif", title: "Do the dishes5", description: "Cleansadfjlaskdfjlsakjdfal"},
    ]
  };

  constructor(props: any) {
    super(props);


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
        <TodoCardV2
          title={item.title} 
          description={item.description} 
          selected={isActive}
          dragBehavior={drag}
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>

        <View style={[styles.cardInvis, {maxHeight: 74}]}>
          <Text style={styles.pageTitleLargeGreen}>{this.state.todoName}</Text>
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

export default ListView;
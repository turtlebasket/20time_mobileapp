import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableNativeFeedback,
  Image,
  FlatList,
  Animated,
  PanResponder,
  PanResponderInstance
} from 'react-native';
import styles from "../styles/Styles"
import miscstyles from "../styles/MiscStyles"
import TodoCard from '../components/TodoCardOld';
import appColors from '../styles/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
      {key: "abc", title: "Push out the trash", description: "Very difficult, be careful"},
      {key: "def", title: "Do the dishes", description: "Clean"},
      {key: "ghi", title: "Load the dishwasher", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "123", title: "Fold the laundry", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "456", title: "Do the dishes", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "asdf", title: "Get Help", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "jwoef", title: "Do the dishesasldkjfalskdjf", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "0239ri", title: "Do the dishesasldkjfalskdjf", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "jl23j", title: "Do the dishesasldkjfalskdjf", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "j23ori", title: "Do the dishesasldkjfalskdjf", description: "Cleansadfjlaskdfjlsakjdfal"},
      {key: "2j3oif", title: "Do the dishesasldkjfalskdjf", description: "Cleansadfjlaskdfjlsakjdfal"},
    ]
  };

  _panResponder: PanResponderInstance;
  point = new Animated.ValueXY();
  scrollOffset = 0;
  flatlistTopOffset = 0;
  rowHeight = 0;
  currentIndex = -1;
  currentY = 0;
  active = false;

  constructor(props: any) {
    super(props);

    // shamelessly ripped from React Native docs
    this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
          true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
          true,
  
        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
          this.currentY = gestureState.y0;
          this.currentIndex = this.yToIndex(gestureState.y0);
          this.active = true;
          // Animated.event([{y: this.point.y}], {useNativeDriver: false})({
          //   y: gestureState.moveY - this.rowHeight / 2
          // });
          this.setState(
            {dragging: true, draggingIndex: this.currentIndex}, 
            () => { // setState callback
              this.animatelist();
            } 
          );
        },
        onPanResponderMove: (evt, gestureState) => {
          this.currentY = gestureState.moveY;
          Animated.event([{y: this.point.y}], {useNativeDriver: false})({
            y: gestureState.moveY - this.rowHeight / 2
          });
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false, // ben awad: set to false
        onPanResponderRelease: (evt, gestureState) => {
          this.reset();
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {
          this.reset();
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        }
      });

  }

  reset = () => {
    this.setState({dragging: false, draggingIndex: -1});
    this.active = false;
  }

  yToIndex = (y: number) => {
    return Math.floor((this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight);
  }

  animatelist = () => {
    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      // check y value to see if we need to reorder
      const newIndex = this.yToIndex(this.currentY);
      if (this.currentIndex !== newIndex) {
        this.setState({
          todos: this.immutableMove(this.state.todos, this.currentIndex, newIndex),
          draggingIndex: newIndex
        })
      }
      this.currentIndex = newIndex;
      this.animatelist();
    });
  };

  // Ripped from StackOverflow & modified
  immutableMove = (arr: any[], from: number, to: number) => {
    return arr.reduce((prev, current, idx, self) => {
      if (from === to) {
        prev.push(current);
      }
      if (idx === from) {
        return prev;
      }
      if (from < to) {
        prev.push(current);
      }
      if (idx === to) {
        prev.push(self[from]);
      }
      if (from > to) {
        prev.push(current);
      }
      return prev;
    }, []);
  }

  render() {

    const { todos, dragging, draggingIndex } = this.state;

    const renderItem = ({ item, index, selected }: any) => (
      <View
        onLayout={event => {
          this.rowHeight = event.nativeEvent.layout.height;
        }}
        style={{opacity: draggingIndex === index ? 0 : 1 }}
      >
        <TodoCard 
          title={item.title} 
          description={item.description} 
          completeInitial={item.complete}
          panHandlers={this._panResponder.panHandlers}
          selected={selected}
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        { dragging && (<Animated.View style={{position: 'absolute', width: "100%", zIndex: 2, top: this.point.getLayout().top}}>
          { renderItem({item: this.state.todos[this.state.draggingIndex], index: -1, selected: true})}
        </Animated.View>)}

        <View style={styles.cardInvis}>
          <Text style={styles.pageTitleLargeGreen}>{this.state.todoName}</Text>
        </View>

        <FlatList 
          scrollEnabled={!dragging}
          style={{
            marginTop: 40,
            flexDirection: 'column',
            width: "100%",
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          onScroll={event => {
            this.scrollOffset = event.nativeEvent.contentOffset.y;
          }}
          onLayout={event => {
            this.flatlistTopOffset = event.nativeEvent.layout.y;
          }}
        />

      </SafeAreaView>
    );

    /* SCRAPPED SORTABLELIST CODE */
    // <SortableList
    //   data={todos}
    //   renderRow={({ data, active }) => (
    //     <Animated.View>
    //       <TodoCard title={data.title} description={data.description}/>
    //     </Animated.View>
    //   )}
    // />

    /* SCRAPPED MANUAL LIST RENDER CODE */
    // var displayTodos = []
    // for (let i of this.state.todos) {
    //   displayTodos.push(
    //     <TodoCard 
    //       title={i.title} 
    //       description={i.description} 
    //       complete={i.complete}
    //     />
    //   );
    // }
    // return (
    //   <ScrollView style={{backgroundColor: appColors.black}}>
    //     <View style={styles.container}>
    //       <View style={styles.cardInvis}>
    //         <Text style={styles.pageTitleLargeGreen}>{this.state.todoName}</Text>
    //       </View>
    //       { displayTodos }
    //     </View>
    //   </ScrollView>
    // );
  }
}

export default ListView;
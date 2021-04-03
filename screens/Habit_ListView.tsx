import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import HabitCard from '../components/HabitCard';
import IconButtonCircle from '../components/IconButtonCircle';
import { getHabitList } from '../data/UserData';
import styles from '../styles/Styles';
import {v4 as uuidv4} from 'uuid';

interface HabitListProps {
  navigation: any;
}

interface HabitListState {
  habits: any[];
}

class HabitListView extends Component<HabitListProps, HabitListState> {
  state={
    habits: []
  }
  
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    // this.setState({}); // ADD STUFF LATER
    getHabitList().then((val: any) => {
      this.setState({habits: val ? val : []});
    })
  }

  render() {

    const { navigation } = this.props;

    type HabitCard = {
      id: string;
      title: string;
    }

    const renderItem = ({item, index, drag, isActive}: RenderItemParams<HabitCard>)  => (
      <View>
        <HabitCard
        id={item.id}
        title={item.title}
        />
      </View>
    );

    const {habits} = this.state;

    return (

      <SafeAreaView style={styles.container}>
        <View style={[styles.header, 
        {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <Text style={styles.pageTitleLargeGreen}>Habits</Text>
          {/* Snap all of these to the right */}
          <View style={{marginLeft: 'auto'}}> 
            <IconButtonCircle icon={faPlus} onPress={() => {
              navigation.navigate("EditHabitItem", {id: uuidv4()})
            }} />
          </View>
        </View>

        <DraggableFlatList 
        style={{
          minWidth: "100%"
        }}
        dragItemOverflow={false}
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item: any, index) => `draggable-item-${item.id}`}
        />

      </SafeAreaView>
    );
  }
}

export default function HabitListViewWrapper(props: any) {
  const navigation = useNavigation();
  const route = useRoute();
  return <HabitListView navigation={navigation}/>
}
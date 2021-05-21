import { faPlus, faRoute } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import HabitCard from '../components/HabitCard';
import IconButtonCircle from '../components/IconButtonCircle';
import { getHabitList } from '../data/UserDataLocal';
import styles from '../styles/Styles';
import { useQuery } from 'react-query';
import { fetchHabits } from '../api/api';

type HabitListState = {
  habits: any[];
}

function HabitListView (props: any) {

  const {data: habits, error} = useQuery('habits', fetchHabits);
  // const [habits, setHabits] = useState([]);
  
  useEffect(() => {
  }, []);

  const navigation = useNavigation();

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

  return (

    <SafeAreaView style={styles.container}>
      <View style={[styles.header, 
      {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
        <Text style={styles.pageTitleLargeGreen}>Habits</Text>
        {/* Snap all of these to the right */}
        <View style={{marginLeft: 'auto'}}> 
          <IconButtonCircle icon={faPlus} onPress={() => {
            navigation.navigate("EditHabitItem", {id: undefined})
          }} />
        </View>
      </View>

      <DraggableFlatList 
      style={{
        minWidth: "100%"
      }}
      dragItemOverflow={false}
      data={habits as HabitCard[]}
      renderItem={renderItem}
      keyExtractor={(item: any, index) => `draggable-item-${item.id}`}
      />

    </SafeAreaView>
  );
}

export default function HabitListViewWrapper(props: any) {
  const navigation = useNavigation();
  const route = useRoute();
  return <HabitListView navigation={navigation}/>
}
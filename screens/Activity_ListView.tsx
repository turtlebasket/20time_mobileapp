import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native";
import ActivityCard from "../components/ActivityCard";
import { supabase } from "../data/SupabaseUtil";
import styles from "../styles/Styles";

export default function ActivityListView() {

  const [pData, setPData] = useState<any[] | null>();
  const [listData, setListData] = useState();

  const fetchData = () => {
    supabase.from('activities').select(`
    id,
    action,
    userId,
    target
    `).then(({data, error}) => {
      setPData(data);
      console.log(data);
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const renderItem = ({ item, index }: any) => {

    const { userId, action, target } = item;

    const username = "User"; // get via userId later

    return (
      <ActivityCard action={action} username={username} itemName={target}/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitleLargeGreen}>Activity</Text>
      </View>

        {/*
        <ActivityCard itemName='Exercise' action='habit' username="TestUser"/>
        <ActivityCard itemName='Read' action='habit' username="TestUser2"/>
        <ActivityCard itemName='Calc Worksheet' action='todo' username="TestUser"/>
        <ActivityCard action='friend' username="TestUser2"/>
        <ActivityCard action='habit' username="TestUser"/>
        <ActivityCard action='friend' username="TestUser"/>
        */}
    </View>
  )
}
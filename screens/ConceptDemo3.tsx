import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../styles/Styles';

export default function ConceptDemo3(props: any) {

  const [data, setData] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitleLargeGreen}>Supabase Demo</Text>
      </View>
      <ScrollView>
        <Text style={styles.pageText}></Text>
      </ScrollView>
    </View>
  );
}
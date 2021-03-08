import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IconButtonCircle from '../components/IconButtonCircle';
import styles from '../styles/Styles';

interface HabitListProps {
  navigation: any;
}

interface HabitListState {
  habits: any[];
}

class HabitListView extends Component<HabitListProps, HabitListState> {
  
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    // this.setState({}); // ADD STUFF LATER
  }

  render() {

    const { navigation } = this.props;

    return (

      <SafeAreaView style={styles.container}>

        <View style={[styles.header, 
        {maxHeight: 64, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <Text style={styles.pageTitleLargeGreen}>Habits</Text>
          {/* Snap all of these to the right */}
          <View style={{marginLeft: 'auto'}}> 
            <IconButtonCircle icon={faPlus} onPress={() => {
              navigation.navigate("EditTodoItem")
            }} />
          </View>
        </View>

      </SafeAreaView>
    )
  }
}

export default function HabitListViewWrapper(props: any) {
  const navigation = useNavigation();
  const route = useRoute();
  return <HabitListView navigation={navigation}/>
}
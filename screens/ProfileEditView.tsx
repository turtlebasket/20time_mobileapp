import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import IconButtonCircle from '../components/IconButtonCircle';
import { supabase } from '../data/SupabaseUtil';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function ProfileEditView() {

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    supabase.from('userData').select('userId')
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitleLargeGreen}>Edit Profile</Text>
        <View style={{marginLeft: 'auto'}}>
          <IconButtonCircle icon={faSave} onPress={() => {
            // do some stuff here
            navigation.goBack();
          }}/>
        </View>
      </View>
      <View style={[styles.card, {width: "96%", minHeight: 100, flexDirection: 'column'}]}>
        <TextInput // title
          // autoFocus={true}
          style={[styles.textBox, {minWidth: 90, width: 210}]}
          multiline={false}
          numberOfLines={1}
          placeholder={"Name"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
          value={name}
          onChangeText={(contents) => {
            setName(contents);
          }}
        />
        <TextInput // title
          // autoFocus={true}
          style={[styles.textBox, {minWidth: 90, width: 210}]}
          multiline={false}
          numberOfLines={1}
          placeholder={"Bio"}
          placeholderTextColor={appColors.lightGray}
          selectionColor={appColors.green1}
          textAlign={'left'}
          value={bio}
          onChangeText={(contents) => {
            setBio(contents);
          }}
        />
      </View>
    </View>
  );
}
import { faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchUserData, setUserData } from '../api/api';
import IconButtonCircle from '../components/IconButtonCircle';
import IconButtonTransparent from '../components/IconButtonTransparent';
import { supabase, userId } from '../data/SupabaseUtil';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';

export default function ProfileEditView() {

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: userData, error } = useQuery('userData', fetchUserData);
  const userDataMutation = useMutation('userData', setUserData, {onSuccess: data => {
    queryClient.invalidateQueries('userData')
  }});

  useEffect(() => {
    setName(userData.name);
    setBio(userData.bio);
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <IconButtonTransparent icon={faTimes} onPress={navigation.goBack}/>
        <Text style={styles.pageTitleLargeGreen}>Edit Profile</Text>

        <View style={{marginLeft: 'auto'}}>
          <IconButtonCircle icon={faSave} onPress={() => {

            userDataMutation.mutateAsync({ name: name, bio: bio })
            navigation.goBack();

          }}/>
        </View>
      </View>
      <View style={[styles.card, {width: "96%", minHeight: 100, flexDirection: 'column'}]}>
        <TextInput // title
          style={[styles.textBox, {width: 'auto', fontWeight: 'bold'}]}
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
          style={[styles.textBox, {width: 'auto'}]}
          multiline={true}
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
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import appColors from '../styles/Colors';
import styles from '../styles/Styles';
import IconButtonTransparent from './IconButtonTransparent';

type props = {
  username: string,
  action: string, // habit, todo, friend
  liked?: string,
  itemName?: string,
};

export default function ActivityCard(props: props) {

  const {username: user, action, itemName} = props;
  const name = user; // check name using ID
  let text = "";

  switch (action) {
    case 'habit':
      text = `${name} made progress on habit "${itemName}"`;
      break;
    case 'todo':
      text = `${name} finished "${itemName}"`;
      break;
    case 'friend':
      text = `${name} added you as a friend!`;
      break;
    default: // change later ig
      text = `${name} added you as a friend!`;
      break;
  }

  const [liked, setLike] = useState(typeof props.liked != undefined ? props.liked : false);

  return (
    <View style={[styles.cardInvis, 
    {flexDirection: 'row', width: '100%', maxHeight: 60, alignItems: 'center', marginHorizontal: 0}]}>
      <Image
        source={{
          uri: "https://pce-coops.com/wp-content/uploads/2019/04/blank-profile-picture-973460_1280-e1561474127956.png"
        }}
        style={[styles.profilePictureSmall, {width: 42, height: 42, borderRadius: 21}]}
      />
      <View style={{flexDirection: 'column', marginHorizontal: 10, maxWidth: 250}}>
        <Text style={[styles.pageText, {marginRight: 30}]}>{text}</Text>
        <Text style={styles.pageTextLight}>3 days ago</Text>
      </View>
      <View style={{marginLeft: 'auto', display: action == 'friend' ? 'none' : 'flex'}}>
        <IconButtonTransparent 
        icon={faHeart} 
        iconSize={22}
        color={liked ? appColors.pink1 : appColors.midGray} 
        onPress={() => {
          setLike(!liked);
        }}/>
      </View>
    </View>
  );
}
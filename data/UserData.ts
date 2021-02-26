import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableHighlightComponent } from 'react-native';
import { Value } from 'react-native-reanimated';
import uuid from 'uuid';


/* DATA STRUCTURE

  users = [
    {
      id: "<guid>",
      name: "",
      email: "",
      dob: "",
      todos: [
        {
          id: "<guid>",
          title: "",
          description: ""
        }
      ],
      connections: [
        "<guid>",
        "<guid>"
      ]
    }
  ];
  */

/* USER JSON MANAGEMENT
 * Handy utils to get & write dictionary values in memory
 */

export function getByGuid(list: any[], guid: string) {
  var item = list.find(obj => {
    return obj.id === guid
  });
  return item;
}

export function setByGuid(list: any[], item: any) {
  var itemIndex=list.indexOf(list.find(obj => {return obj.id == item.id}))
  console.log(`INDEX ${itemIndex}`);
  if (itemIndex == -1) {
    list[itemIndex] = item;
  } else {
    list.push(item);
  }
}


/* STORAGE
 * Getting & writing to disk/cloud
 */

export async function toDisk(key: string, obj: JSON) {
  const objStr = JSON.stringify(obj);
  AsyncStorage.setItem(`@${key}`, objStr);
}

export async function fromDisk(key: string) {
  const objStr = await AsyncStorage.getItem(`@${key}`);
  const obj = objStr != null ? JSON.parse(objStr) : null;
  return obj;
}

export async function toCloud() {
}

export async function fromCloud() {
}

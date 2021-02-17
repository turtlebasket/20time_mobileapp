/* Card with (& representing) Todo item.
 */

import styles from '../styles/Styles'
import appColors from '../Colors'

import { TouchableHighlight, Text } from 'react-native'
import React, { Component } from 'react'
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function TodoCard(props: any) {
    return (
        <View style={styles.card}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{margin: 'auto', justifyContent: 'center', alignContent: 'center'}}>
                    <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        size={30}
                        style={{
                            color: appColors.white,
                            marginRight: 20,
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.pageTextLarge}>{props.title}</Text>
                    <Text style={styles.pageText}>{props.description}</Text>
                </View>

                <View style={{flex: 1, alignSelf: 'flex-end'}}>
                    <Text>Configure</Text>
                </View>
            </View>
        </View>
    );
}
export default TodoCard;
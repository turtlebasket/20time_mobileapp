/* EXPERIMENTAL Dipslay cards that can be clicked on.
 * Usefulness level: questionable
 */

import styles from '../styles/Styles'
import appColors from '../Colors'

import { TouchableHighlight, Text } from 'react-native'
import React, { Component } from 'react'

class TouchableCardBase extends Component{
    state = {
        isPressed: false
    }

    render() {
        return (
            <TouchableHighlight 
                activeOpacity = {1}
                style = {this.state.isPressed ? styles.card : styles.cardPress}
                onPressIn = {() => {
                    this.setState({isPressed: true})
                }}
                onPressOut = {() => {
                    this.setState({isPressed: true})
                }}
            >
                <Text style={styles.pageText}>hi</Text>
            </TouchableHighlight>
        )
    }
}

export default TouchableCardBase;
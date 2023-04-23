/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    Text,
    Button,
    TextInput
} from 'react-native';


class TradScreen extends Component {
    render() {
    return (
        <LinearGradient colors={['#F25477', '#FFA7A6']} style={styles.view}>
            <Text style={styles.title}>日本語訳</Text>
            <TextInput style={styles.input} placeholder="日本語" />
            <TextInput style={styles.input} placeholder="Français" />
            <Button title="Traduire" onPress={() => {}} />
        </LinearGradient>
    )};
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 60
    },
    input: {
        height: 80,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
});


export default TradScreen;
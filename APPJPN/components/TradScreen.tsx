/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    Text,
    TextInput,
    Pressable
} from 'react-native';


class TradScreen extends Component {
    render() {
    return (
        <LinearGradient colors={['#F25477', '#FFA7A6']} style={styles.view}>
            <Text style={styles.title}>日本語訳</Text>
            <TextInput style={styles.input} placeholder="日本語" />
            <TextInput style={styles.input} placeholder="Français" />
            <Pressable style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Traduire</Text>
            </Pressable>
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
        fontSize: 45,
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
    button: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        color: '#000000'
    }
});


export default TradScreen;
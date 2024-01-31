/*
 * Copyright (c) 2023, BALLEUR Maxime
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 * Author: BALLEUR Maxime
 * Date: 2023
 *
 * @format
*/

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    Text,
    TextInput,
    StatusBar
} from 'react-native';

import Translator from 'react-native-translator';

import Knob from '../components/Knob';


function TradScreen() {
    type Language = "fr" | "ja";

    const [fromLanguage, setFromLanguage] = useState<Language>("fr");
    const [toLanguage, setToLanguage] = useState<Language>("ja");
    const [placeholder, setPlaceholder] = useState('français');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    function changeLangue() {
        if (fromLanguage === 'fr') {
            setFromLanguage("ja");
            setPlaceholder('日本語');
            setToLanguage("fr");
        } else {
            setFromLanguage("fr");
            setPlaceholder('Français');
            setToLanguage("ja");
        }
    }


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <Text style={styles.title}>日本語訳</Text>

            <Translator
                from = {fromLanguage}
                to = {toLanguage}
                value = {value}
                onTranslated = {(t) => setResult(t)}
            />

            <TextInput
                style = {styles.input}
                placeholder = {placeholder}
                value = {value}
                onChangeText = {(t) => setValue(t)}
            />

            <Text style={styles.output}>{result}</Text>

            <Knob
                textContent = "Changer de langue"
                onPressContent = {changeLangue}
                buttonStyle = {styles.button}
                textStyle = {styles.buttonText}
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
    },

    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 60
    },

    input: {
        fontSize: 18,
        height: 60,
        width: 320,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    output: {
        fontSize: 22,
        height: 350,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    button: {
        marginTop: 40,
        padding: 10,
        borderRadius: 6,
        margin: 10,
        width: 200,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    }
});


export default TradScreen;
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
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    Text,
    TextInput,
    Pressable
} from 'react-native';

import {TranslatorProvider} from 'react-native-translator'
import Translator from 'react-native-translator';


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
        <TranslatorProvider>
            <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
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

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                    onPress = {changeLangue}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Changer de langue</Text>
                    )}
                </Pressable>
            </LinearGradient>
        </TranslatorProvider>
    );
}


const styles = StyleSheet.create({
    container: {
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
        fontSize: 18,
        height: 60,
        width: 320,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },

    output: {
        fontSize: 22,
        height: 350,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
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
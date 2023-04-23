/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
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
    const [fromLanguage, setFromLanguage] = useState('fr');
    const [toLanguage, setToLanguage] = useState('ja');
    const [placeholder, setPlaceholder] = useState('français');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    function changeLangue() {
        if (fromLanguage === 'fr') {
            setFromLanguage('ja');
            setPlaceholder('日本語');
            setToLanguage('fr');
        } else {
            setFromLanguage('fr');
            setPlaceholder('français');
            setToLanguage('ja');
        }
    }

    return (
        <TranslatorProvider>
            <LinearGradient colors={['#F25477', '#FFA7A6']} style={styles.view}>
                <Text style={styles.title}>日本語訳</Text>
                <Translator
                    from={fromLanguage}
                    to={toLanguage}
                    value={value}
                    onTranslated={(t) => setResult(t)}
                />
                <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={(t) => setValue(t)} />
                <Text style={styles.output}>{result}</Text>
                <Pressable style={styles.button} onPress={changeLangue}>
                    <Text style={styles.buttonText}>Changer de langue</Text>
                </Pressable>
            </LinearGradient>
        </TranslatorProvider>
    );
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
    output: {
        height: 200,
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
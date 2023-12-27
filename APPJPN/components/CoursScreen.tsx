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
import React, { useState, Component, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    FlatList
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import RNFS from 'react-native-fs';


const CoursStack = createStackNavigator();

class CoursScreen extends Component {
    render() {
    return (
        <NavigationContainer independent={true}>
            <CoursStack.Navigator>
                <CoursStack.Screen
                    name="CoursMainScreen" 
                    component={DicoMainScreen} 
                    options={{ headerShown: false }}
                />
            </CoursStack.Navigator>
        </NavigationContainer>
    )}
}


interface DataItem {
    kana: string;
    kanji: string;
}


function DicoMainScreen() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        RNFS.readFileAssets('data/dico.json', 'utf8')
            .then((contents) => {
                setData(JSON.parse(contents));
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }, []);

    const search = () => {
        let res = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].kana == text) {
                res = data[i].kanji;
                break;
            }
        }
        setResult(res);
    }

    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <Text style={styles.title}>日本語辞書</Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setText(text)}
                value={text}
                placeholder="ひらがな"
            />

            <Pressable
                style={styles.button}
                onPress={search}>
                <Text style={styles.buttonText}>検索</Text>
            </Pressable>

            <Text style={styles.result}>{result}</Text>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FFC0CB',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 50,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    result: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 20,
    },
});


export default DicoMainScreen;
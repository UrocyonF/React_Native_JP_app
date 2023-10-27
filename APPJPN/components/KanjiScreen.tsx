/*
 * Copyright (c) 2023, UrocyonF
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 * Author: UrocyonF
 * Date: 2023
 *
 * @format
*/

/*

Screen to test yourself on kanji

There is 3 parts on the screen:
- the top bar
- the input field
- the result field

On the top bar there is:
- the reset button
- the help button
- the apply button
- the kanji ask (in hiragana/katakana and it's translation)

The input field is where you enter the kanji ask.

The result field is where you see if you are right or not. It is empty at the beginning.
And when you press the apply button, it will show you if you are right or not.
*/

import 'react-native-gesture-handler';

import React, { useRef, useState, Component, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
} from 'react-native';

import {
    Canvas,
    CanvasRef,
  } from '@benjeau/react-native-draw';

import LinearGradient from 'react-native-linear-gradient';

import RNFS from 'react-native-fs';

//import KanjiCategoryScreen from './kanji/KanjiCategoryScreen';


const KanjiStack = createStackNavigator();

class KanjiScreen extends Component {
    render() {
    return (
        <NavigationContainer independent={true}>
            <KanjiStack.Navigator>
                <KanjiStack.Screen
                    name="KanjiMainScreen" 
                    component={KanjiMainScreen} 
                    options={{ headerShown: false }}
                />
            </KanjiStack.Navigator>
        </NavigationContainer>
    )}
}


function KanjiMainScreen() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const [data, setData] = useState([]);

    const canvasRef = useRef<CanvasRef>(null);

    useEffect(() => {
        RNFS.exists(RNFS.DocumentDirectoryPath + '/kanji.json')
        .then((result) => {
            if (!result) {
                RNFS.copyFileAssets('dico.json', RNFS.DocumentDirectoryPath + '/kanji.json')
                .then(() => {
                    RNFS.readFile(RNFS.DocumentDirectoryPath + '/kanji.json', 'utf8')
                    .then((contents) => {
                        setData(JSON.parse(contents));
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
            } else {
                RNFS.readFile(RNFS.DocumentDirectoryPath + '/kanji.json', 'utf8')
                .then((contents) => {
                    setData(JSON.parse(contents));
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    }, [])

    const search = () => {
        let res = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].kana == text) {
                res = data[i].kanji;
            }
        }
        setResult(res);
    }

    const reset = () => {
        canvasRef.current?.clear();
    }

    return (
        <LinearGradient
            colors={['#4E164B', '#612B5E']}
            style={styles.container}
        >
            <Text style={styles.title}>Kanji</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Enter the kanji"
            />
            <Canvas
                ref={canvasRef}
                thickness={5}
                style={styles.canvas} 
            />
            <Pressable
                style={styles.button}
                onPress={search}
            >
                <Text style={styles.buttonText}>Apply</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={reset}
            >
                <Text style={styles.buttonText}>Reset</Text>
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
        fontFamily: 'Roboto',
    },
    title: {
        fontSize: 50,
        color: '#ffffff',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        width: 200,
        height: 50,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
    },
    result: {
        fontSize: 20,
        color: '#ffffff',
    },
    canvas: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        marginBottom: 20,
    }
});


export default KanjiScreen;
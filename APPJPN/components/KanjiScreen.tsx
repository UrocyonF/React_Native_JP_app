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
import 'react-native-gesture-handler';

import React, { useRef, useState, Component, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View
} from 'react-native';

import {
    Canvas,
    CanvasRef,
  } from '@benjeau/react-native-draw';

import  { SvgXml } from 'react-native-svg';

import LinearGradient from 'react-native-linear-gradient';

import kanjiData from './kanji/kanji.json';


const KanjiStack = createStackNavigator();

const emptySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><path d="" stroke="#000000" stroke-width="5" opacity="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;


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
    const [input, setInput] = useState('');

    const [canvasWidth, setCanvasWidth] = useState(300);
    const [canvasHeight, setCanvasHeight] = useState(300);
    const [canvasEnabled, setCanvasEnabled] = useState(true);
    const [svgPath, setSvgPath] = useState(emptySvg);

    const [kanjiJson, setKanjiJson] = useState([]);

    const canvasRef = useRef<CanvasRef>(null);


    useEffect(() => {
        setKanjiJson(kanjiData.jlpt5);
    }, []);


    useEffect(() => {
        giveNewKanji()
    }, [kanjiJson]);


    const giveNewKanji = () => {
        if (kanjiJson.length > 0) {
            setInput(kanjiJson[Math.floor(Math.random() * kanjiJson.length)].romaji);
        }
    }


    const validate = () => {
        const paths = canvasRef.current?.getSvg();
        resetCanva(150, 150, false);
        if (paths) {
            setSvgPath(paths);
        }
    }


    const resetCanva = (
        width: React.SetStateAction<number>,
        height: React.SetStateAction<number>,
        enable: React.SetStateAction<boolean>,
        reset_svg: React.SetStateAction<boolean> = true
    ) => {
        canvasRef.current?.clear();
        setCanvasWidth(width);
        setCanvasHeight(height);
        setCanvasEnabled(enable);
        if (reset_svg) {
            setSvgPath(emptySvg);
        }
    }


    const newWord = () => {
        resetCanva(300, 300, true);
        giveNewKanji();
        setText('');
        setResult('');
    }


    return (
        <LinearGradient
            colors={['#4E164B', '#612B5E']}
            style={styles.container}
        >
            <Text style={styles.title}>{input}</Text>
            <View>
                <Canvas
                    ref={canvasRef}
                    thickness={5}
                    width={canvasWidth}
                    height={canvasHeight}
                    enabled={canvasEnabled}
                    style = {{...styles.canvas, width: canvasWidth, height: canvasHeight}}
                />
                <SvgXml xml = {svgPath} width="150" height="150" style={styles.svg}/>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => resetCanva(300, 300, true)}
            >
                <Text style={styles.buttonText}>Reset </Text>
            </Pressable>
            <TextInput
                autoCapitalize="none"
                placeholder="Traduction..."
                style={styles.input}
                value={text}
                onChange={(event) => setText(event.nativeEvent.text)}
            />
            <Text style={styles.result}>{result}</Text>
            <Pressable
                style={styles.button}
                onPress={validate}
            >
                <Text style={styles.buttonText}>Valider </Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={newWord}
            >
                <Text style={styles.buttonText}>Suivant </Text>
            </Pressable>
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
        width: 300,
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
        maxWidth: 300,
        maxHeight: 300,
        backgroundColor: '#ffffff',
        marginBottom: 20,
    },
    svg : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: 300,
    }
});


export default KanjiScreen;
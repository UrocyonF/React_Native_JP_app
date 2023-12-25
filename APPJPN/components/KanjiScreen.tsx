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
    const [choice, setChoice] = useState(Object);
    const [precendChoice, setPrecendChoice] = useState(Object);
    
    const [correctionViewDisplay, setcorrectionViewDisplay] = useState('none');
    const [textInput, setTextInput] = useState('');
    const [textInoutWidth, setTextInoutWidth] = useState(300);

    const [showingCorrection, setShowingCorrection] = useState(false);
    const [canvasSize, setCanvasSize] = useState(300);
    const [canvasEnabled, setCanvasEnabled] = useState(true);
    const [svgPath, setSvgPath] = useState(emptySvg);

    const [kanjiJson, setKanjiJson] = useState([{}]);

    const canvasRef = useRef<CanvasRef>(null);


    useEffect(() => {
        setKanjiJson(kanjiData.jlpt5);
    }, []);


    useEffect(() => {
        giveNewKanji()
    }, [kanjiJson]);


    const giveNewKanji = () => {
        if (kanjiJson.length > 0) {
            let choice = kanjiJson[Math.floor(Math.random() * kanjiJson.length)]
            while (choice === precendChoice) {
                choice = kanjiJson[Math.floor(Math.random() * kanjiJson.length)]
            }
            setChoice(choice);
            setPrecendChoice(choice);
        }
    }


    const validate = () => {
        if (!showingCorrection) {
            const paths = canvasRef.current?.getSvg();
            resetCanvas(150, 180, false);
            if (paths) {
                setSvgPath(paths);
            }
            setShowingCorrection(true);
        }
    }


    const resetCanvas = (
        size: React.SetStateAction<number>,
        width: React.SetStateAction<number>,
        enable_n_reset: React.SetStateAction<boolean>,
    ) => {
        setTextInput('');
        canvasRef.current?.clear();
        setCanvasSize(size);
        setTextInoutWidth(width);
        setCanvasEnabled(enable_n_reset);
        if (enable_n_reset) {
            setSvgPath(emptySvg);
            setcorrectionViewDisplay('none');
        } else {
            setcorrectionViewDisplay('flex');
        }
        setShowingCorrection(false);
    }


    const newWord = () => {
        resetCanvas(300, 300, true);
        giveNewKanji();
        setShowingCorrection(false);
    }


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <View style={{height: 60}}></View>
            <Text style={styles.wordGiven}>{choice.on}</Text>
            <Text style={styles.wordGiven}>{choice.kun}</Text>

            <View style={styles.centredView}>
                <View style={styles.viewFlexRow}>
                    <View style={styles.viewRow}>
                        <Canvas
                            ref={canvasRef}
                            thickness={5}
                            width={canvasSize}
                            height={canvasSize}
                            enabled={canvasEnabled}
                            style = {{width: canvasSize, height: canvasSize}}
                        />
                        <SvgXml xml = {svgPath} width="150" height="150" style={styles.svg}/>
                    </View>

                    <View style={{...styles.viewRow, minHeight: 150, minWidth: 150, display: correctionViewDisplay as "none" | "flex"}}>
                        <Text style={styles.kanjiCorrection}>{choice.kanji}</Text>
                    </View>
                </View>

                <Pressable
                    style={styles.button}
                    onPress={() => resetCanvas(300, 300, true)}>
                    <Text style={styles.buttonText}>Reset</Text>
                </Pressable>
                
                <View style={styles.viewFlexRow}>
                    <View style={{...styles.viewRow, backgroundColor: "none", borderWidth: 0}}>
                        <TextInput
                            autoCapitalize="none"
                            placeholder="Traduction..."
                            style={{...styles.tradInput, width: textInoutWidth}}
                            value={textInput}
                            multiline={true}
                            onChange={(event) => setTextInput(event.nativeEvent.text)}
                        />
                    </View>

                    <View style={{...styles.viewRow, backgroundColor: "none", borderWidth: 0, display: correctionViewDisplay as "none" | "flex"}}>
                        <TextInput
                            editable = {false}
                            style={{...styles.tradInput, width: 180}}
                            value={choice.fr}
                            multiline={true}
                        />
                    </View>
                </View>

                <Pressable
                    style={styles.button}
                    onPress={validate}>
                    <Text style={styles.buttonText}>Valider</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={newWord}>
                    <Text style={styles.buttonText}>Suivant</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    wordGiven: {
        textAlign: 'center',
        height: 120,
        fontSize: 33,
        color: '#FFFFFF',
        marginBottom: 20
    },

    centredView: {
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#FDF0F0',
        padding: 10,
        width: 200,
        height: 50,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center'
    },

    viewFlexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    viewRow: {
        display: 'flex',
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderWidth: 1,
        padding: 2
    },

    kanjiCorrection: {
        fontSize: 100,
        textAlign: 'center',
        color: '#0F0F0F'
    },

    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: 300
    },

    tradInput: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 17,
        color: '#000000'
    }
});


export default KanjiScreen;
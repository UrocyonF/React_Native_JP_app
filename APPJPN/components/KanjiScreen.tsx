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
    View,
    StatusBar
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
        setTextInput('');
        resetCanvas(300, 300, true);
        giveNewKanji();
        setShowingCorrection(false);
    }


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <View style={styles.viewFlexRow}>
                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.topBarItems]}
                    onPress={() => resetCanvas(300, 300, true)}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }]}>Réinitialiser</Text>
                    )}
                </Pressable>

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.topBarItems]}
                    onPress={() => resetCanvas(300, 300, true)}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }]}>Réinitialiser</Text>
                    )}
                </Pressable>

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.topBarItems]}
                    onPress={() => resetCanvas(300, 300, true)}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }]}>Réinitialiser</Text>
                    )}
                </Pressable>
            </View>


            <View style={{height: 130, paddingTop: 5}}>
                <Text style={styles.wordGiven}>{choice.kunyomi}</Text>
                <Text style={styles.wordGiven}>{choice.onyomi}</Text>
            </View>

            <View style={styles.centredView}>
                <View style={{...styles.viewFlexRow, height: 325}}>
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

                    <View style={{...styles.viewRow, minHeight: 156, minWidth: 156, display: correctionViewDisplay as "none" | "flex"}}>
                        <Text style={styles.kanjiCorrection}>{choice.kanji}</Text>
                    </View>
                </View>

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                    onPress={() => resetCanvas(300, 300, true)}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Réinitialiser</Text>
                    )}
                </Pressable>
                
                <View style={{...styles.viewFlexRow, height: 140}}>
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
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                    onPress={validate}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Vérifier</Text>
                    )}
                </Pressable>

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                    onPress={newWord}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Suivant</Text>
                    )}
            </Pressable>
            </View>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topBarItems: {
        alignSelf: 'center',

    },

    wordGiven: {
        textAlign: 'center',
        fontSize: 27,
        color: 'white',
    },

    centredView: {
        alignItems: 'center'
    },

    button: {
        padding: 10,
        width: 200,
        height: 50,
        borderRadius: 6,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },

    viewFlexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    viewRow: {
        display: 'flex',
        backgroundColor: 'white',
        marginBottom: 20,
        borderWidth: 1,
        padding: 2,
        alignSelf: 'center'
    },

    kanjiCorrection: {
        fontSize: 100,
        textAlign: 'center',
        color: 'black'
    },

    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 300,
        height: 300
    },

    tradInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        marginBottom: 20,
        fontSize: 17,
        color: 'black'
    }
});


export default KanjiScreen;
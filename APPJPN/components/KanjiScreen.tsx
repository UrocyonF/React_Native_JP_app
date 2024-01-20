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
    var showingCorrection = false;

    const canvasRef = useRef<CanvasRef>(null);

    const [topBarLang, setTopBarTxtLang] = useState('FR');
    const [topBarOnyomiColor, setTopBarOnyomiColor] = useState('thistle');
    const [topBarKunyomiColor, setTopBarKunyomiColor] = useState('thistle');

    const [isOnyomi, setIsOnyomi] = useState(true);
    const [isKunyomi, setIsKunyomi] = useState(true);
    const [kunyomiDisplay, setKunyomiDisplay] = useState('');
    const [onyomiDisplay, setOnyomiDisplay] = useState('');
    const [tradDisplay, setTradDisplay] = useState('');

    const [wordJson, setWordJson] = useState(Object);
    const [lastWordJson, setPrecendWordJson] = useState(Object);
    
    const [correctionViewDisplay, setcorrectionViewDisplay] = useState('none');
    const [textInput, setTextInput] = useState('');
    const [textInoutWidth, setTextInoutWidth] = useState(300);

    const [canvasSize, setCanvasSize] = useState(300);
    const [canvasEnabled, setCanvasEnabled] = useState(true);
    const [svgPath, setSvgPath] = useState(emptySvg);

    const [kanjiJson, setKanjiJson] = useState([{}]);


    useEffect(() => {
        setKanjiJson(kanjiData.jlpt5);
    }, []);

    useEffect(() => {
        giveNewKanji()
    }, [kanjiJson]);

    useEffect(() => {
        if (!isKunyomi && !isOnyomi) {
            setIsOnyomi(true);
            setTopBarOnyomiColor('thistle');
        }
    }, [isKunyomi]);

    useEffect(() => {
        if (!isKunyomi && !isOnyomi) {
            setIsKunyomi(true);
            setTopBarKunyomiColor('thistle');
        }
    }, [isOnyomi]);

    useEffect(() => {
        manageDisplayYomi();
        if (topBarLang === 'FR') {
            setTradDisplay(wordJson.fr);
        } else {
            setOnyomiDisplay(wordJson.fr);
            setTradDisplay(wordJson.kunyomi === '' ? wordJson.onyomi : wordJson.kunyomi + '\n' + wordJson.onyomi);
            setKunyomiDisplay('');
        }
    }, [wordJson, isKunyomi, isOnyomi]);


    const giveNewKanji = () => {
        let choice;
        if (kanjiJson.length > 1) {
            do {
                choice = kanjiJson[Math.floor(Math.random() * kanjiJson.length)];
            } while (choice === lastWordJson);
        } else {
            choice = kanjiJson[0];
        }
        setWordJson(choice);
        setPrecendWordJson(choice);
    }

    const changeLanguage = () => {
        newWord();
        giveNewKanji();
        if (topBarLang === 'FR') {
            if (!isKunyomi) manageKunyomi();
            if (!isOnyomi) manageOnyomi();
            setTopBarTxtLang('JP');
        } else {
            setTopBarTxtLang('FR');
        }
    }

    const newWord = () => {
        setTextInput('');
        resetCanvas(300, 300, true);
        giveNewKanji();
        showingCorrection = false;
    }

    const manageKunyomi = () => {
        const tmp = topBarKunyomiColor === 'thistle' ? 'rgba(216, 191, 216, 0.4)' : 'thistle';
        setTopBarKunyomiColor(tmp);
        setIsKunyomi(!isKunyomi);
    }

    const manageOnyomi = () => {
        const tmp = topBarOnyomiColor === 'thistle' ? 'rgba(216, 191, 216, 0.4)' : 'thistle';
        setTopBarOnyomiColor(tmp);
        setIsOnyomi(!isOnyomi);
    }

    const manageDisplayYomi = () => {
        setKunyomiDisplay(isKunyomi ? wordJson.kunyomi : '');
        setOnyomiDisplay(isOnyomi ? wordJson.onyomi : '');
    }

    const validate = () => {
        if (!showingCorrection) {
            const paths = canvasRef.current?.getSvg();
            resetCanvas(150, 180, false);
            if (paths) {
                setSvgPath(paths);
            }
            showingCorrection = true;
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
        showingCorrection = false;
    }


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <View style={{...styles.viewFlexRow, marginBottom: 12}}>
                <View>
                    <Pressable
                        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(200, 200, 200, 0.2)' : 'transparent' }, styles.topBarItems]}
                        onPress={() => changeLanguage()}>
                        <Text style={{...styles.topBarText, color: 'thistle'}}>{topBarLang}</Text>
                    </Pressable>
                </View>
                
                <View style={styles.topBarItemsRight}>
                    <Pressable
                        disabled={topBarLang === 'FR' ? false : true}
                        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(200,200,200,0.2)' : 'transparent' }, styles.topBarItems]}
                        onPress={() => manageKunyomi()}>
                        <Text style={{...styles.topBarText, textAlign: 'right', color: topBarKunyomiColor}}>KUN</Text>
                    </Pressable>

                    <Pressable
                        disabled={topBarLang === 'FR' ? false : true}
                        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(200,200,200,0.2)' : 'transparent' }, styles.topBarItems]}
                        onPress={() => manageOnyomi()}>
                        <Text style={{...styles.topBarText, textAlign: 'right', color: topBarOnyomiColor}}>ON</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.wordGiven}>
                <Text style={styles.wordGivenText}>{kunyomiDisplay}</Text>
                <Text style={styles.wordGivenText}>{onyomiDisplay}</Text>
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
                        <Text style={styles.kanjiCorrection}>{wordJson.kanji}</Text>
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
                            value={tradDisplay}
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
        marginTop: 23
    },

    topBarItems: {
        width: 61,
        height: 30,
        borderRadius: 6
    },
    topBarItemsRight: {
        position: 'absolute',
        right: 0
    },
    topBarText: {
        fontSize: 20,
        marginHorizontal: 10
    },

    wordGiven: {
        height: 130
    },
    wordGivenText: {
        textAlign: 'center',
        fontSize: 27,
        color: 'white'
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
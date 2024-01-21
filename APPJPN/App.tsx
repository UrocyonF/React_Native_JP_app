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
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';

import Knob from './components/Knob';

import DicoScreen from './screens/DicoScreen';
import TradScreen from './screens/TradScreen';
import KanaScreen from './screens/KanaScreen';
import KanjiScreen from './screens/KanjiScreen';
import LessonScreen from './screens/LessonScreen';


const MainStack = createStackNavigator();


function App(): JSX.Element {
    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{headerShown: false}}
                >
                <MainStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <MainStack.Screen
                    name="DicoScreen"
                    component={DicoScreen}
                />
                <MainStack.Screen
                    name="TradScreen"
                    component={TradScreen}
                />
                <MainStack.Screen
                    name="KanaScreen"
                    component={KanaScreen}
                />
                <MainStack.Screen
                    name="KanjiScreen"
                    component={KanjiScreen}
                />
                <MainStack.Screen
                    name="LessonScreen"
                    component={LessonScreen}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}


function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor={'#02006F'}/>

            <View style={styles.title}>
                <Text style={styles.titleText}>日</Text>
                <Text style={styles.titleText}>本</Text>
                <Text style={styles.titleText}>語</Text>
            </View>

            <Knob
                textContent="Dictionnaire"
                onPressContent={() => navigation.navigate('DicoScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <Knob
                textContent="Traduction"
                onPressContent={() => navigation.navigate('TradScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <Knob
                textContent="Kana"
                onPressContent={() => navigation.navigate('KanaScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <Knob
                textContent="Kanji"
                onPressContent={() => navigation.navigate('KanjiScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <Knob
                textContent="Leçons"
                onPressContent={() => navigation.navigate('LessonScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly",
        paddingBottom: 15,
        paddingTop: 15
    },

    title: {
        position: 'absolute',
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 280,
        color: '#FF9AB6',
        lineHeight: 325,
        opacity: 0.2,
        marginTop: -60,
        textShadowColor: '#FF88AA',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },

    button: {
        padding: 10,
        borderRadius: 6,
        margin: 10,
        width: 200,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center'
    }
});


export default App;
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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import DicoScreen from './components/DicoScreen';
import TradScreen from './components/TradScreen';
import KanaScreen from './components/KanaScreen';
import KanjiScreen from './components/KanjiScreen';
import CoursScreen from './components/CoursScreen';

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
                    name="CoursScreen"
                    component={CoursScreen}
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

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                onPress={() => navigation.navigate('DicoScreen')}>
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Dictionnaire</Text>
                )}
            </Pressable>

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                onPress={() => navigation.navigate('TradScreen')}>
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Traduction</Text>
                )}
            </Pressable>

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                onPress={() => navigation.navigate('KanaScreen')}>
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Kana</Text>
                )}
            </Pressable>

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                onPress={() => navigation.navigate('KanjiScreen')}>
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Kanji</Text>
                )}
            </Pressable>

            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                onPress={() => navigation.navigate('CoursScreen')}>
                {({ pressed }) => (
                    <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Leçons</Text>
                )}
            </Pressable>
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
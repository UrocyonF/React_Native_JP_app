/**
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
    Pressable
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import DicoScreen from './components/DicoScreen';
import TradScreen from './components/TradScreen';
import KanaScreen from './components/KanaScreen';

const MainStack = createStackNavigator();


function App(): JSX.Element {
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="DicoScreen"
                    component={DicoScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="TradScreen"
                    component={TradScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="KanaScreen"
                    component={KanaScreen}
                    options={{ headerShown: false }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}


function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <LinearGradient colors={['#EC275F', '#F25477', '#FFA7A6', '#FFDCDC']} style={styles.view}>
            <Text style={styles.title}>日本語</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('DicoScreen')}>
                <Text style={styles.ButtonText}>Dico</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('TradScreen')}>
                <Text style={styles.ButtonText}>Trad</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('KanaScreen')}>
                <Text style={styles.ButtonText}>Kana</Text>
            </Pressable>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    title: {
        fontWeight: '800',
        fontSize: 50,
        color: '#FFFFFF'
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
    ButtonText: {
        fontSize: 30,
        color: "#444444"
    },
});


export default App;
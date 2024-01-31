/*
 * Copyright (c) 2023, BALLEUR Maxime
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 * Author: BALLEUR Maxime
 * Date: 2023-2024
 *
 * @format
*/

import 'react-native-gesture-handler';
import React, { useState, Component, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    FlatList
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';

import LessonNameJson from '../constants/lesson/_lessonsName_.json';

import Knob from '../components/Knob';

import LessonTemplateScreen from './lesson/LessonTemplateScreen';


const LessonStack = createStackNavigator();


class LessonScreen extends Component {
    render() {
    return (
        <NavigationContainer independent={true}>
            <LessonStack.Navigator>
                <LessonStack.Screen
                    name="LessonMainScreen"
                    component={LessonMainScreen}
                    options={{ headerShown: false }}
                />
                <LessonStack.Screen
                    name="LessonTemplateScreen"
                    component={LessonTemplateScreen}
                    options={{ headerShown: false }}
                />
            </LessonStack.Navigator>
        </NavigationContainer>
    )}
}


function LessonMainScreen({ navigation }: { navigation: any }) {
    const [lessonsJson, setLessonsJson] = useState<string[][]>([]);


    useEffect(() => {
        setLessonsJson(LessonNameJson.name);
    }, []);


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.container}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <Text style={styles.title}>Choisi ta leçon !</Text>

            <FlatList
                data={lessonsJson}
                renderItem={({item}) =>
                    <Knob
                        textContent={(item[0] as string)}
                        onPressContent={() => navigation.navigate('LessonTemplateScreen', {lesson: {item}})}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                }
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
    },

    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        marginTop: 20
    },

    button: {
        padding: 7,
        borderRadius: 6,
        marginBottom: 15,
        width: 240,
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25
    }
});


export default LessonScreen;
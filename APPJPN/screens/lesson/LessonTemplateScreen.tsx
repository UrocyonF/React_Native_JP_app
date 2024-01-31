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
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

/*
Best option : fetch the JSON data from a server.
This way, I can request any file based on strSearch[1].
Something like this:

fetch(`https://server.com/path/to/lessons/${strSearch[1]}.json`)
.then(response => response.json())
.then(json => {
    setLessonsJson(json);
})
.catch(err => {
    console.error("Error loading JSON file:", err);
});

But as a test version, I will import the JSON file directly.
*/
import LessonJson from '../../constants/lesson/1_verb.json';

import Example from '../../components/lesson/Example';
import Lesson from '../../components/lesson/Lesson';
import More from '../../components/lesson/More';
import Warning from '../../components/lesson/Warning';


function LessonTemplateScreen({ route }: { route: any }) {
    const [lessonsJson, setLessonsJson] = useState({
        title: '',
        lesson1: ''
    });


    useEffect(() => {
        //import...
        setLessonsJson(LessonJson);
    }, []);


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <View>
                <Text style={styles.title}>{lessonsJson.title}</Text>
            </View>

            <Lesson textContent={lessonsJson.lesson1}/>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        marginTop: 20
    }
});


export default LessonTemplateScreen
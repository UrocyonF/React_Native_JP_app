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


function LessonTemplateScreen({ route }: { route: any }) {

    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <View>
                <Text>Test</Text>
            </View>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        marginTop: 10
    }
});


export default LessonTemplateScreen
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
import React, { useState, Component, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    FlatList,
    StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RNFS from 'react-native-fs';

import LinearGradient from 'react-native-linear-gradient';

import Knob from '../components/Knob';

import DicoCategoryScreen from './dico/DicoCategoryScreen';
import DicoAddScreen from './dico/DicoAddScreen';
import DicoSearchScreen from './dico/DicoSearchScreen';


const DicoStack = createStackNavigator();


class DicoScreen extends Component {
    render() {
    return (
        <NavigationContainer independent={true}>
            <DicoStack.Navigator>
                <DicoStack.Screen
                    name="DicoMainScreen" 
                    component={DicoMainScreen} 
                    options={{ headerShown: false }}
                />
                <DicoStack.Screen
                    name="DicoSearchScreen"
                    component={DicoSearchScreen}
                    options={{ headerShown: false }}
                />
                <DicoStack.Screen
                    name="DicoAddScreen"
                    component={DicoAddScreen}
                    options={{ headerShown: false }}
                />
                <DicoStack.Screen
                    name="DicoCategoryScreen"
                    component={DicoCategoryScreen}
                    options={{ headerShown: false }}
                />
            </DicoStack.Navigator>
        </NavigationContainer>
    )}
}


function DicoMainScreen({ navigation }: { navigation: any }) {
    const [dicoJson, setDicoJson] = useState({categorys: []});
    const [search, setSearch] = useState('');


    useEffect(() => {
        RNFS.exists(RNFS.DocumentDirectoryPath + '/dico.json')
        .then((result) => {
            if (!result) {
                RNFS.copyFileAssets('dico.json', RNFS.DocumentDirectoryPath + '/dico.json')
                .then(() => {
                    RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
                    .then((contents) => {
                        setDicoJson(JSON.parse(contents));
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
            } else {
                RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
                .then((contents) => {
                    setDicoJson(JSON.parse(contents));
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    }, [])


    function toSearchScreen() {
        if (search !== "") {
            setSearch(search.toLowerCase().replace(/ /g, ''));
            navigation.navigate('DicoSearchScreen', {search: {search}});
        }
        setSearch('');
    }


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Recherche"
                value = {search}
                onChange={(event) => setSearch(event.nativeEvent.text)}
                onEndEditing={toSearchScreen}
            />

            <Knob
                textContent="Ajouter"
                onPressContent={() => navigation.navigate('DicoAddScreen')}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <FlatList 
                style={styles.categoriesView}
                horizontal={false}
                numColumns={2}
                data={dicoJson.categorys}
                renderItem={
                    ({item}) =>
                    <Knob
                        textContent={(item as string).charAt(0).toUpperCase() + (item as string).slice(1)}
                        onPressContent={() => navigation.navigate('DicoCategoryScreen', {category: {item}})}
                        buttonStyle={styles.categoriesButton}
                        textStyle={styles.buttonText}
                    />
                }
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center'
    },

    button: {
        padding: 7,
        borderRadius: 6,
        marginBottom: 30,
        width: 180,
        borderWidth: 1
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        marginBottom: 20,
        marginTop: 50,
        width: 250
    },

    categoriesView: {
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxHeight: 750
    },
    categoriesButton: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 150,
        borderWidth: 1
    }
});


export default DicoScreen;
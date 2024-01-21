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
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import RNFS from 'react-native-fs';

import ExampleFlatList from '../../components/dico/ExampleFlatList';


function DicoSearchScreen({ route }: { route: any }) {
    const strCategory = route.params.category.item;
    const [dicoJson, setDicoJson] = useState([]);


    useEffect(() => {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            let json = JSON.parse(contents);
            // Sort words alphabetically based on the "fr" key
            json[strCategory].sort((a: any, b: any) => a.fr.localeCompare(b.fr));
            setDicoJson(json);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);


    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <ExampleFlatList/>

            <FlatList
                data={dicoJson[strCategory]}
                style={styles.flatlist}
                renderItem={({item}) => 
                    <View style={styles.article}>
                        <Text style={styles.articleText}>{item.fr}</Text>
                        <Text style={styles.articleText}>{item.kana}</Text>

                        <View style={styles.atricleViewKanjiRomanji}>
                            <Text style={styles.articleText}>{item.kanji}</Text>
                            <Text style={styles.articleTextRomanji}>{item.romaji}</Text>
                        </View>
                    </View>
                }
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        height: '200%',
        marginTop: 10
    },

    flatlist: {
        marginBottom: 920
    },

    article: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    articleText: {
        textAlignVertical: 'center',
        fontSize: 15,
        color: 'black',
        maxWidth: 140,
        minWidth: 40,
        flexWrap: 'wrap',
        flex: 1
    },
    atricleViewKanjiRomanji: {
        flexDirection: 'column'
    },
    articleTextRomanji: {
        fontSize: 11,
        color: 'gray',
        flexWrap: 'wrap',
        flex: 1
    }
});


export default DicoSearchScreen;
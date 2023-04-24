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
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';

import RNFS from 'react-native-fs';


function DicoSearchScreen({ route }: { route: any }) {
    const strCategory = route.params.category.item;
    const [dicoJson, setDicoJson] = useState({categorys: []});

    useEffect(() => {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            setDicoJson(JSON.parse(contents));
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <LinearGradient colors={['#EC275F', '#F25477']} style={styles.view}>
            <View style={styles.firstarticle}>
                <Text style={styles.articleText}>Français</Text>
                <Text style={styles.articleText}>Kana</Text>
                <View>
                    <Text style={styles.articleText}>Kanji</Text>
                    <Text style={styles.articleTextRomanji}>Romaji</Text>
                </View>
            </View>
            <FlatList
                data={dicoJson[strCategory]}
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
        flex: 1,
        alignItems: 'center',
        height: '200%'
    },
    firstarticle: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        margin: 20,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    article: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    articleText: {
        fontSize: 20,
        color: '#000000',
        maxWidth: 140,
        flexWrap: 'wrap'
    },
    atricleViewKanjiRomanji: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    articleTextRomanji: {
        fontSize: 12,
        color: '#444444',
        flexWrap: 'wrap'
    }
});


export default DicoSearchScreen;
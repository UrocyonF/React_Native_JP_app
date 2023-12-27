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
    const [dicoJson, setDicoJson] = useState([]);

    useEffect(() => {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            let json = JSON.parse(contents);
            //tri pas ordre alphabétique les mots à partir de la clé "fr"
            json[strCategory].sort((a: any, b: any) => {
                if (a.fr < b.fr) {
                    return -1;
                }
                if (a.fr > b.fr) {
                    return 1;
                }
                return 0;
            });
            setDicoJson(json);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <View style={styles.firstarticle}>
                <Text numberOfLines={1} style={styles.articleText}>Français</Text>
                <Text numberOfLines={1} style={styles.articleText}>Kana</Text>

                <View>
                    <Text style={styles.articleText}>Kanji</Text>
                    <Text style={styles.articleTextRomanji}>Romaji</Text>
                </View>
            </View>

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
        height: '200%'
    },

    flatlist: {
        marginBottom: 830
    },

    firstarticle: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        margin: 20,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
    },

    article: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    articleText: {
        textAlignVertical: 'center',
        fontSize: 15,
        color: '#000000',
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
        color: '#444444',
        flexWrap: 'wrap',
        flex: 1
    }
});


export default DicoSearchScreen;
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
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    Modal
} from 'react-native';

import RNFS from 'react-native-fs';


function DicoSearchScreen({ route }: { route: any }) {
    const strSearch = route.params.search.search;

    const [response, setResponse] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState({});

    useEffect(readData, []);

    function readData() {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            const dicoJson = JSON.parse(contents);
            let tmpSearch = [];
            for (let i = 0; i < dicoJson.categorys.length; i++) {
                for (let j = 0; j < dicoJson[dicoJson.categorys[i]].length; j++) {
                    if (dicoJson[dicoJson.categorys[i]][j].fr.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(strSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) || dicoJson[dicoJson.categorys[i]][j].kana.includes(strSearch) || dicoJson[dicoJson.categorys[i]][j].kanji.includes(strSearch) || dicoJson[dicoJson.categorys[i]][j].romaji.includes(strSearch)) {
                        tmpSearch.push(dicoJson[dicoJson.categorys[i]][j]);
                    }
                }
            }
            setResponse(tmpSearch);
            return;
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    function displayModal({ item }: { item: any }) {
        setModalItem(item);
        setModalVisible(true);
    }

    function deleteItemConfirm() {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            let dicoJson = JSON.parse(contents);

            for (let i = 0; i < dicoJson.categorys.length; i++) {
                for (let j = 0; j < dicoJson[dicoJson.categorys[i]].length; j++) {
                    if (dicoJson[dicoJson.categorys[i]][j].fr === modalItem.fr && dicoJson[dicoJson.categorys[i]][j].kana === modalItem.kana && dicoJson[dicoJson.categorys[i]][j].kanji === modalItem.kanji && dicoJson[dicoJson.categorys[i]][j].romaji === modalItem.romaji) {
                        dicoJson[dicoJson.categorys[i]].splice(j, 1);
                        break;
                    }
                }
            }

            RNFS.writeFile(RNFS.DocumentDirectoryPath + '/dico.json', JSON.stringify(dicoJson), 'utf8')
            .then((success) => {
                setModalVisible(false);
                readData();
                return;
            })
            .catch((err) => {
                console.log(err.message);
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <LinearGradient colors={['#4E164B', '#612B5E']} style={styles.view}>
            <View style={styles.firstarticle}>
                <Text style={styles.articleText}>Français</Text>
                <Text style={styles.articleText}>Kana</Text>
                <View>
                    <Text style={styles.articleText}>Kanji</Text>
                    <Text style={styles.articleTextRomanji}>Romaji</Text>
                </View>
            </View>
            <FlatList
                data={response}
                style={styles.flatlist}
                renderItem={({item}) =>
                    <View style={styles.article}>
                        <Text style={styles.articleText}>{item.fr}</Text>
                        <Text style={styles.articleText}>{item.kana}</Text>
                        <View style={styles.atricleTextKanjiRomanji}>
                            <Text style={styles.articleText}>{item.kanji}</Text>
                            <Text style={styles.articleTextRomanji}>{item.romaji}</Text>
                        </View>
                        <View style={styles.articleDeleteButton}>
                            <Pressable style={styles.articleDeleteButton}
                                onPress={() => displayModal({item})}>
                                <Text style={styles.atricleDeleteButtonText}>x</Text>
                            </Pressable>
                        </View>
                    </View>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Es-tu sûre de vouloir supprimer ce mot ?</Text>
                        <Pressable style={[styles.button, {backgroundColor: "#ff461d"}]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Non</Text>
                        </Pressable>
                        <Pressable style={[styles.button, {backgroundColor: "#32d200"}]} onPress={deleteItemConfirm}>
                            <Text style={styles.buttonText}>Oui</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
        backgroundColor: '#FDF0F0',
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
    },
    articleDeleteButton: {
        backgroundColor: '#ff461d',
        position: 'absolute',
        padding: 5,
        borderRadius: 3,
        top: 0,
        transform: [{translateY: -5}]
    },
    atricleDeleteButtonText: {
        fontSize: 17,
        color: '#FFFFFF'
    },

    modalCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        color: '#000000',
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },

    button: {
        padding: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        margin: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF'
    }
});


export default DicoSearchScreen;
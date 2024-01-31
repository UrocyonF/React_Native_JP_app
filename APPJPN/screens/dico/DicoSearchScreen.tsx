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
    Pressable,
    Modal,
    StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import RNFS from 'react-native-fs';

import ExampleFlatList from '../../components/dico/ExampleFlatList';


interface ResponseItem {
    fr: string;
    kana: string;
    kanji: string;
    romaji: string;
}

interface ModalItem {
    fr: string;
    kana: string;
    kanji: string;
    romaji: string;
}


function DicoSearchScreen({ route }: { route: any }) {
    const strSearch = route.params.search.search;

    const [response, setResponse] = useState<ResponseItem[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<ModalItem>({
        fr: '',
        kana: '',
        kanji: '',
        romaji: ''
    });


    useEffect(readData, []);


    function readData() {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            const dicoJson = JSON.parse(contents);
            const normalizedStrSearch = strSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            const tmpSearch = dicoJson.categorys.flatMap((category: string) =>
                dicoJson[category].filter((item: any) =>
                    item.fr.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(normalizedStrSearch)
                        || item.kana.includes(strSearch)
                        || item.kanji.includes(strSearch)
                        || item.romaji.includes(strSearch)
                )
            );
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

            const itemMap = dicoJson.categorys.reduce((map: { [key: string]: { category: string, index: number }}, category: string) => {
                dicoJson[category].forEach((item: any, index: number) => {
                    const key = `${item.fr}-${item.kana}-${item.kanji}-${item.romaji}`;
                    map[key] = { category, index };
                });
                return map;
            }, {});
            
            const itemLocation = itemMap[`${modalItem.fr}-${modalItem.kana}-${modalItem.kanji}-${modalItem.romaji}`];
            if (itemLocation) {
                dicoJson[itemLocation.category].splice(itemLocation.index, 1);
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
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <StatusBar barStyle="light-content" translucent={true}/>

            <ExampleFlatList/>

            <FlatList
                data={response}
                style={styles.flatlist}
                renderItem={({item}) =>
                    <View style={styles.article}>
                        <Text style={styles.articleText}>{item.fr}</Text>
                        <Text style={styles.articleText}>{item.kana}</Text>

                        <View>
                            <Text style={styles.articleText}>{item.kanji}</Text>
                            <Text style={styles.articleTextRomanji}>{item.romaji}</Text>
                        </View>

                        <View style={styles.articleDeleteButton}>
                            <Pressable
                                style={styles.articleDeleteButton}
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

                        <Pressable
                            style={[styles.button, {backgroundColor: 'crimson'}]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Non</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, {backgroundColor: 'limegreen'}]}
                            onPress={deleteItemConfirm}>
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
    articleTextRomanji: {
        fontSize: 11,
        color: 'gray',
        flexWrap: 'wrap',
        flex: 1
    },
    articleDeleteButton: {
        backgroundColor: 'crimson',
        position: 'absolute',
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 2,
        top: 0,
        transform: [{translateY: -2}]
    },
    atricleDeleteButtonText: {
        fontSize: 17,
        color: 'white'
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
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        color: 'black',
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
        fontSize: 20
    }
});


export default DicoSearchScreen;
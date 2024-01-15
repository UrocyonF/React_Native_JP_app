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
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Modal
} from 'react-native';

import RNFS from 'react-native-fs';


function DicoAddScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const [category, setCategory] = useState('');
    const [fr, setFr] = useState('');
    const [kana, setKana] = useState('');
    const [kanji, setKanji] = useState('');
    const [romaji, setRomaji] = useState('');

    function addData() {
        if (category === '' || fr === '' || (kana === '' && romaji === '')) {
            setModalVisible(true);
            return;
        }

        RNFS.readFile(RNFS.DocumentDirectoryPath + '/dico.json', 'utf8')
        .then((contents) => {
            let dicoJson = JSON.parse(contents);

            let word = {
                "fr": fr,
                "kana": kana,
                "kanji": kanji,
                "romaji": romaji
            };

            let categoryExist = false;
            for (let i = 0; i < dicoJson.categorys.length; i++) {
                if (dicoJson.categorys[i] === category) {
                    categoryExist = true;
                    dicoJson[category].push(word);
                }
            }
            if (!categoryExist) {
                dicoJson.categorys.push(category);
                dicoJson[category] = new Array(word);
            }

            RNFS.writeFile(RNFS.DocumentDirectoryPath + '/dico.json', JSON.stringify(dicoJson), 'utf8')

            setCategory('');
            setFr('');
            setKana('');
            setKanji('');
            setRomaji('');
        })
        .catch((err) => {
            console.log(err.message, err.code);
            setModalVisible(true);
        });
    }

    return (
        <LinearGradient colors={['#02006F', '#10002B']} style={styles.view}>
            <View style={styles.inputView}>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Catégorie"
                    value = {category}
                    onChange={(event) => setCategory(event.nativeEvent.text.toLowerCase())}
                />

                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Français"
                    value = {fr}
                    onChange={(event) => setFr(event.nativeEvent.text.toLowerCase())}
                />

                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Kana"
                    value = {kana}
                    onChange={(event) => setKana(event.nativeEvent.text)}
                />

                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Kanji"
                    value = {kanji}
                    onChange={(event) => setKanji(event.nativeEvent.text)}
                />

                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Romaji"
                    value = {romaji}
                    onChange={(event) => setRomaji(event.nativeEvent.text.toLowerCase())}
                />

                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, styles.button ]}
                    onPress={addData}>
                    {({ pressed }) => (
                        <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Ajouter</Text>
                    )}
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Il faut au moins renseigner la catégorie, la traduction française et le mot (kana ou romaji)</Text>

                        <Pressable
                            style={({ pressed }) => [{ backgroundColor: pressed ? 'crimson' : 'white' }, styles.modalButton]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            {({ pressed }) => (
                                <Text style={[{ color: pressed ? 'white' : 'black' }, styles.buttonText]}>Fermer</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 60
    },

    inputView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250,
        fontSize: 18
    },

    button: {
        padding: 10,
        borderRadius: 6,
        width: 200,
        borderWidth: 1,
        position: 'absolute',
        bottom: -20
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },

    modalCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
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
        color: 'crimson',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 20
    },
    modalButton: {
        padding: 10,
        borderRadius: 6,
        width: 180,
        borderWidth: 1,
    }
});


export default DicoAddScreen;
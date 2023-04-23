/**
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

var RNFS = require('react-native-fs');


function DicoAddScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const [category, setCategory] = useState('');
    const [fr, setFr] = useState('');
    const [kana, setKana] = useState('');
    const [kanji, setKanji] = useState('');
    const [romaji, setRomaji] = useState('');

    function addData() {
        RNFS.readDir('./dico.json')
        .then(({ dicoJson }: { dicoJson: any }) => {

            if (category === '' || fr === '' || (kana === '' && romaji === '')) {
                setModalVisible(true);
                return;
            }

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
            var fs = require('fs');
            fs.writeFile('./dico.json', JSON.stringify(dicoJson));
            console.log(dicoJson);
        })
    }

    return (
        <LinearGradient colors={['#EC275F', '#F25477']} style={styles.view}>
            <View style={styles.inputView}>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Catégorie"
                    onChange={(event) => setCategory(event.nativeEvent.text.toLowerCase())}
                />
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Français"
                    onChange={(event) => setFr(event.nativeEvent.text.toLowerCase())}
                />
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Kana"
                    onChange={(event) => setKana(event.nativeEvent.text.toLowerCase())}
                />
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Kanji"
                    onChange={(event) => setKanji(event.nativeEvent.text.toLowerCase())}
                />
                <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    style={styles.input}
                    placeholder="Romaji"
                    onChange={(event) => setRomaji(event.nativeEvent.text.toLowerCase())}
                />
            </View>
            <Pressable style={styles.button} onPress={addData}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Il faut au moins renseigner la catégorie, la traduction française et le mot (kana ou romaji)</Text>
                        <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Fermer</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 60
    },
    inputView: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    input: {
        backgroundColor: '#FFDCDC',
        borderRadius: 10,
        margin: 20,
        width: 250,
        fontSize: 18,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 20,
        color: '#444444'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
});


export default DicoAddScreen;
import 'react-native-gesture-handler';
import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    TextInput,
    Pressable
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


const dico = new Map();
const dicoJson = require('./dico.json');

for (var i = 0; i < dicoJson.length; i++) {
    dico.set(dicoJson[i].kana, dicoJson[i].fr);
}


function DicoScreen({ navigation }: { navigation: any }) {
    const [setText] = useState('');
    return (
        <ScrollView>
            <LinearGradient colors={['#EC275F', '#F25477']} style={styles.dicoView}>
                <TextInput
                    style={styles.dicoInput}
                    placeholder="Recherche"
                />
                
            </LinearGradient>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    dicoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    dicoInput: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        alignItems: 'center'
    },
});


export default DicoScreen;
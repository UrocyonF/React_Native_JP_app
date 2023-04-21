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
                <Pressable style={styles.dicoButton} onPress={() => navigation.navigate('DicoAddScreen')}>
                    <Text style={styles.dicoButtonText}>Ajouter</Text>
                </Pressable>
                <TextInput
                    style={styles.dicoInput}
                    placeholder="Recherche"
                />
                <View style={styles.categoriesView}>
                    <Pressable style={styles.categoriesButton} onPress={() => navigation.navigate('DicoSearchScreen')}>
                        <Text style={styles.dicoButtonText}>Verbe</Text>
                    </Pressable>
                    <Pressable style={styles.categoriesButton} onPress={() => navigation.navigate('DicoSearchScreen')}>
                        <Text style={styles.dicoButtonText}>Adjectif</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    dicoView: {
        flex: 1,
        alignItems: 'center',
        height: '200%',
        justifyContent: "space-evenly"
    },
    dicoButton: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1
    },
    dicoButtonText: {
        fontSize: 20,
        color: "#444444"
    },
    dicoInput: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 20,
        marginBottom: 60,
        width: 250,
        alignItems: 'center'
    },
    categoriesView: {
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    categoriesButton: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 150,
        alignItems: 'center',
        borderWidth: 1
    }
});


export default DicoScreen;
/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';


function DicoSearchScreen({ route }: { route: any }) {
    const strCategory = route.params.category.item;
    const dicoJson = require('./dico.json');

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
                        <View style={styles.atricleTextKanjiRomanji}>
                            <Text style={styles.articleText}>{item.kanji}</Text>
                            <Text style={styles.articleTextRomanji}>{item.romanji}</Text>
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
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    article: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: 375,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    articleText: {
        fontSize: 20,
        color: '#000000'
    },
    atricleTextKanjiRomanji: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    articleTextRomanji: {
        fontSize: 12,
        color: '#444444'
    }
});


export default DicoSearchScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ExampleFlatList = () => (
    <View style={styles.firstarticle}>
        <Text style={styles.articleText}>Français</Text>
        <Text style={styles.articleText}>Kana</Text>

        <View>
            <Text style={styles.articleText}>Kanji</Text>
            <Text style={styles.articleTextRomanji}>Romaji</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    firstarticle: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 20,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70
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
    }
});


export default ExampleFlatList;
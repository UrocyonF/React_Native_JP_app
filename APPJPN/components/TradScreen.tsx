import 'react-native-gesture-handler';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput
} from 'react-native';


class TradScreen extends React.Component {
    render() {
    return (
        <LinearGradient colors={['#F25477', '#FFA7A6']} style={styles.tradView}>
            <Text style={styles.tradTitle}>日本語訳</Text>
            <TextInput style={styles.tradInput} placeholder="日本語" />
            <TextInput style={styles.tradInput} placeholder="Français" />
            <Button title="Traduire" onPress={() => {}} />
        </LinearGradient>
    )};
}


const styles = StyleSheet.create({
    tradView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tradTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 60,
    },
    tradInput: {
        height: 80,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
});


export default TradScreen;
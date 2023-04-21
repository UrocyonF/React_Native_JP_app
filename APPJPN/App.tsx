import 'react-native-gesture-handler';
import React from 'react';

import {
    StyleSheet,
    Text,
    Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import DicoScreen from './components/DicoScreen';
import DicoSearchScreen from './components/DicoSearchScreen';
import DicoAddScreen from './components/DicoAddScreen';
import TradScreen from './components/TradScreen';
import KanaScreen from './components/KanaScreen';


const Stack = createStackNavigator();


function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DicoScreen" component={DicoScreen} />
                <Stack.Screen name="DicoSearchOutput" component={DicoSearchScreen} />
                <Stack.Screen name="DicoAddInput" component={DicoAddScreen} />
                <Stack.Screen name="TradScreen" component={TradScreen} />
                <Stack.Screen name="KanaScreen" component={KanaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


function HomeScreen({ navigation }: { navigation: any }) {
    return (
        <LinearGradient colors={['#EC275F', '#F25477', '#FFA7A6', '#FFDCDC']} style={styles.homeView}>
            <Text style={styles.homeTitle}>日本語</Text>
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate('DicoScreen')}>
                <Text style={styles.homeButtonText}>Dictionnary</Text>
            </Pressable>
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate('TradScreen')}>
                <Text style={styles.homeButtonText}>Traduction</Text>
            </Pressable>
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate('KanaScreen')}>
                <Text style={styles.homeButtonText}>あ Kana ア</Text>
            </Pressable>
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    homeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    homeTitle: {
        fontWeight: '800',
        fontSize: 50,
        color: '#FFFFFF'
    },
    homeButton: {
        backgroundColor: '#FFDCDC',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1,
    },
    homeButtonText: {
        fontSize: 30,
        color: "#444444"
    },
});


export default App;
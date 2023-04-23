/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    FlatList
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import DicoSearchScreen from './dico/DicoSearchScreen';
import DicoAddScreen from './dico/DicoAddScreen';


const DicoStack = createStackNavigator();

class DicoScreen extends Component {
    render() {
    return (
        <NavigationContainer independent={true}>
            <DicoStack.Navigator>
                <DicoStack.Screen
                    name="DicoMainScreen" 
                    component={DicoMainScreen} 
                    options={{ headerShown: false }}
                />
                <DicoStack.Screen
                    name="DicoSearchScreen"
                    component={DicoSearchScreen}
                    options={{ headerShown: false }}
                />
                <DicoStack.Screen
                    name="DicoAddScreen"
                    component={DicoAddScreen}
                    options={{ headerShown: false }}
                />
            </DicoStack.Navigator>
        </NavigationContainer>
    )}
}


function DicoMainScreen({ navigation }: { navigation: any }) {
    const dicoJson = require('./dico/dico.json');

    return (
        <LinearGradient colors={['#EC275F', '#F25477']} style={styles.view}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('DicoAddScreen')}>
                <Text style={styles.buttonText}>Ajouter</Text>
            </Pressable>
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Recherche"
            />
            <FlatList style={styles.categoriesView}
                horizontal={false}
                numColumns={2}
                data={dicoJson.categorys}
                renderItem={({item}) => 
                    <Pressable style={styles.categoriesButton} onPress={() => navigation.navigate('DicoSearchScreen', {category: {item}})}>
                        <Text style={styles.buttonText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    </Pressable>
                }
            />
        </LinearGradient>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        height: '200%',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        color: '#444444'
    },
    input: {
        backgroundColor: '#FFFFFF',
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
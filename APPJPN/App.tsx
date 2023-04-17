import React, { Component } from 'react';
import 'react-native-gesture-handler';

import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();


function HomeScreen({navigation}: {navigation: any}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to modifications"
                onPress={() => navigation.navigate('ModifScreen')}
            />
        </View>
    );
}


function ModifScreen({navigation}: {navigation: any}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to home"
                onPress={() => navigation.navigate('HomeScreen')}
            />
        </View>
    );
}


function App(): JSX.Element {
    return (

        /*
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{title: 'Welcome'}}
                />
                <Stack.Screen 
                    name="ModifScreen" 
                    component={ModifScreen}
                    options={{title: 'Modifications'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
        */

       <view style={styles.mainView}>
              <Text style={styles.mainTitle}>Hello World</Text>
        </view>
    )
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
    },
    mainTitle: {
        fontWeight: '800',
        fontSize: 40,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
});

export default App;

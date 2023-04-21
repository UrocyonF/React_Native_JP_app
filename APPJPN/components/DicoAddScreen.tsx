import 'react-native-gesture-handler';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Pressable
} from 'react-native';


function DicoAddScreen({ navigation }: { navigation: any }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go home"
                onPress={() => navigation.navigate('HomeScreen')}
            />
        </View>
    );
}


export default DicoAddScreen;
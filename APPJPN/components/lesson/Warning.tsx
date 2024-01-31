import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface WarningProps {
    textContent: string;
}


const Warning: React.FC<WarningProps> = ({ textContent }) => (
    <View>
        <Text>{textContent}</Text>
    </View>
);


const styles = StyleSheet.create({
    
});


export default Warning;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface ExampleProps {
    textContent: string;
}


const Example: React.FC<ExampleProps> = ({ textContent }) => (
    <View>
        <Text>{textContent}</Text>
    </View>
);


const styles = StyleSheet.create({
    
});


export default Example;
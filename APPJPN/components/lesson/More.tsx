import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface MoreProps {
    textContent: string;
}


const More: React.FC<MoreProps> = ({ textContent }) => (
    <View>
        <Text>{textContent}</Text>
    </View>
);


const styles = StyleSheet.create({
    
});


export default More;
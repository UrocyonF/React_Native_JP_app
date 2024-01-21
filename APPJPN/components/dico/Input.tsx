import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


interface InputProps {
    valueContent: any;
    onChangeContent: any;
    placeholderContent: string;
}


const Input: React.FC<InputProps> = ({ valueContent, onChangeContent, placeholderContent }) => (
    <TextInput
        autoCapitalize="none"
        autoComplete="off"
        style={styles.input}
        placeholder={placeholderContent}
        value = {valueContent}
        onChange={onChangeContent}
    />
);


const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250,
        fontSize: 18
    }
});


export default Input;
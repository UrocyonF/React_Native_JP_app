import React from 'react';
import { Pressable, Text } from 'react-native';


interface KnobProps {
    textContent: string;
    onPressContent: () => void;
    buttonStyle?: any;
    textStyle?: any;
}


const Knob: React.FC<KnobProps> = ({ textContent, onPressContent, buttonStyle, textStyle }) => (
    <Pressable
        style={({ pressed }) => [{ backgroundColor: pressed ? 'thistle' : 'white' }, buttonStyle]}
        onPress={onPressContent}>
        {({ pressed }) => (
            <Text style={[{ color: pressed ? 'white' : 'black' }, textStyle]}>{textContent}</Text>
        )}
    </Pressable>
);


export default Knob;
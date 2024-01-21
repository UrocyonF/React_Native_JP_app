import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';


interface TopBarButtonProps {
    disabledContent: boolean;
    onPressContent: () => void;
    textContent: string;
    textAlignContent: "right" | "left";
    colorContent: string;
}


const TopBarButton: React.FC<TopBarButtonProps> = ({ disabledContent, onPressContent, textContent, textAlignContent, colorContent }) => (
    <Pressable
        disabled={disabledContent}
        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(200,200,200,0.2)' : 'transparent' }, styles.topBarItems]}
        onPress={onPressContent}>
        <Text style={{...styles.topBarText, textAlign: textAlignContent, color: colorContent}}>{textContent}</Text>
    </Pressable>
);


const styles = StyleSheet.create({
    topBarItems: {
        width: 61,
        height: 30,
        borderRadius: 6
    },
    topBarText: {
        fontSize: 20,
        marginHorizontal: 10
    }
});


export default TopBarButton;
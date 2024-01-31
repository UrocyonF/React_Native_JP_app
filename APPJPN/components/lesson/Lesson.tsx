import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface LessonProps {
    textContent: string;
}


const Lesson: React.FC<LessonProps> = ({ textContent }) => (
    <View>
        <Text style={styles.text}>{textContent}</Text>
    </View>
);


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
});


export default Lesson;
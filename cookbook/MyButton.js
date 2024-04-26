import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyButton = props => {
    const length = props.title.length;

    return (
        <TouchableOpacity style={[styles.button, {width: length * 20}]} onPress={props.onPressFunction}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFA800",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
    },
    buttonText: {
    color: 'white',
    fontSize: 18, // make this flexible
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Playfair Display",
  },
});

export default MyButton;
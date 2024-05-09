import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Text, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

const Recipe = props => {
    const recipe = props.content;

    const redirectPage = () => {
        navigation.navigate('RecipeView', {recipe});
    }

    return (
        <View style={{alignContent:'center'}}>
            <TouchableOpacity style={[styles.button, {width: 320, height: 150, marginBottom: 20}]} onPress={props.onPressFunction}>
            <View style={{flexDirection: 'row', marginLeft: 18, marginTop: 18}}>
                <Image 
                    style={{width: 120, height: 120, marginRight: 10}}
        q           source={{uri:recipe[4]}}/>
                <Text style={styles.buttonText}>{recipe[1]}</Text>
            </View>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#e0e0e0",
        height: 30,
        borderRadius: 9,
    },
    buttonText: {
    color: 'black',
    fontSize: 18, // make this flexible
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Playfair Display",
  },
});

export default Recipe;
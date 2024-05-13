import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
let size = 0;

if(width > height) {
    size = 10;
} else {
    size = 5;
}

const Rectangle = props => {
    const len = props.title.length;

    return (
        <View style={{marginBottom: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFA800", height: 22, width: len + 40, borderRadius: 9}}>
            <Text key={props.id} style={{color:'white', fontFamily: 'PlayfairDisplay_700Bold', fontSize: size}}>{props.title}</Text>
        </View>

    );
};

export default Rectangle;
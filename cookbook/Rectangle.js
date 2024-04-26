import React from 'react';
import { View, Text } from 'react-native';

const Rectangle = props => {
    const len = props.title.length;

    return (
        <View style={{marginBottom: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFA800", height: 22, width: len + 40, borderRadius: 9}}>
            <Text style={{color:'white', fontWeight: 650, fontFamily: 'PlayfairDisplay'}}>{props.title}</Text>
        </View>

    );
};

export default Rectangle;
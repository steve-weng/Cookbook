import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import Header from './Header';
// import MyButton from './MyButton';

const RecipeEdit = ({navigation}) => {
    const route = useRoute(); 
    const recipe = route.params.recipe;


    return (
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Text>{recipe[1]}</Text>
        </View>
    );
  };
  
  export default RecipeEdit;
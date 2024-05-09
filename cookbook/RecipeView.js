import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './Header';

const RecipeView = () => {
    const route = useRoute(); 
    const recipe = route.params.recipe;
    console.log(typeof(recipe[2]));

    return (
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <View style={{paddingTop: 60, paddingBottom:50}}>
            <Header />
          </View>

          <View style={{flexDirection:'row'}}>
            <Image 
              style={{width: 190, height: 130, marginRight: 20, marginBottom: 50}}
              source={{uri:recipe[4]}}/>
            <Text style={{fontWeight: 900, paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 30}}>{recipe[1]}</Text>
          </View>

          <View style={{flexDirection: 'column'}}>

            <Text style={{paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Ingredients</Text>
            <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 17}}>{recipe[2]}</Text>

            <Text style={{paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Steps</Text>
            <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 17}}>{recipe[3]}</Text>
          </View>
        </View>
    );
  };
  
  export default RecipeView;
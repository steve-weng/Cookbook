import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './Header';
import MyButton from './MyButton';

const RecipeView = ({navigation}) => {
    const route = useRoute(); 
    const recipe = route.params.recipe;

    const redirectHome = () => {
        navigation.navigate('Home');
    }

    const handleDelete = () => {
        // delete the function from database here
        // automatically redirects back to home
        navigation.navigate('Home');
    }

    const handleEdit = () => {
        navigation.navigate('RecipeEdit', {recipe});
    }

    return (
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <View style={{paddingTop: 60, paddingBottom:50}}>
            <Header />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image 
              style={{width: 190, height: 130, marginRight: 20, marginBottom: 30}}
              source={{uri:recipe[4]}}/>
            <Text style={{fontWeight: 900, paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 30}}>{recipe[1]}</Text>
          </View>

          <View style={{flexDirection: 'column', position: 'absolute', marginLeft: -145, marginTop: 450}}>
              <Text style={{paddingBottom: 5, marginRight: 15, fontWeight: 750, fontFamily: "PlayfairDisplay", fontSize: 20}}>Ingredients:</Text>
              <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 17}}>{recipe[2]}</Text>

            <Text style={{paddingBottom: 5, marginRight: 15, fontWeight: 750, fontFamily: "PlayfairDisplay", fontSize: 20}}>Steps</Text>
            <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: 17}}>{recipe[3]}</Text>
          </View>

          <MyButton title="Back" width={100} onPressFunction={redirectHome} />
          <MyButton title="Edit" width={100} onPressFunction={handleEdit} />
          <MyButton title="Delete" width={100} onPressFunction={handleDelete} />
        </View>
    );
  };
  
  export default RecipeView;
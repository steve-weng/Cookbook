import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './Header';
import MyButton from './MyButton';

const RecipeView = ({navigation}) => {
    const route = useRoute(); 
    const recipe = route.params.recipe;
    const {width, height} = Dimensions.get('window');

    let titlesize = 0;
    let headingsize = 0;
    let size = 0;

    if(width > height) {
      titlesize = 25;
      headingsize = 20;
      size = 15;
    } else {
      titlesize = 20;
      headingsize = 15;
      size = 10;
    }

    const redirectHome = () => {
        navigation.navigate('Home');
    }

    const handleDelete = () => {
        // delete the function from database here
        // automatically redirects back to home

        var formData = new FormData();
        formData.append("recipeName", recipe[1]);
       fetch('http://127.0.0.1:5000/deleteRecipe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
       })
       .then(res => res.json()).then(data => {
    
        if(data.success) {
          console.log(data);
          navigation.navigate('Home');
        }
         
        });
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
            <Text style={{paddingBottom: 20, fontFamily: 'PlayfairDisplay_900Black', fontSize: titlesize}}>{recipe[1]}</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
              <Text style={{paddingBottom: 5, marginRight: 15, fontFamily: 'PlayfairDisplay_700Bold', fontSize: headingsize}}>Ingredients:</Text>
              <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: size}}>{recipe[2]}</Text>

            <Text style={{paddingBottom: 5, marginRight: 15, fontFamily: 'PlayfairDisplay_700Bold', fontSize: headingsize}}>Steps:</Text>
            <Text style={{paddingBottom: 20, fontFamily: "PlayfairDisplay", fontSize: size}}>{recipe[3]}</Text>

            <View style={{alignItems: 'center'}}>
            <MyButton width={200} title="Back" onPressFunction={redirectHome} />
            </View>

            <View style={{alignItems: 'center', paddingTop: 10}}>
            <MyButton width={200} title="Edit" onPressFunction={handleEdit} />
            </View>

            <View style={{alignItems: 'center', paddingTop: 10}}>
            <MyButton width={200} title="Delete" onPressFunction={handleDelete} />
            </View>
          </View>

        </View>
    );
  };
  
  export default RecipeView;
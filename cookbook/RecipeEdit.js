import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './Header';
import MyButton from './MyButton';

const RecipeEdit = ({navigation}) => {
    const route = useRoute(); 
    const recipe = route.params.recipe;
    const oldName = recipe[1];

    const [name, setName] = useState(recipe[1]);
    const [ingredients, setIngredients] = useState(recipe[2]);
    const [steps, setSteps] = useState(recipe[3]);
    const [image, setImage] = useState(recipe[4]);

    const handleNameChange = (text) => {
        setName(text);
    }

    const handleStepsChange = (text) => {
        setSteps(text);
    }

    const handleIngredientsChange = (text) => {
        setIngredients(text);
    }

    const handleImageChange = (text) => {
        setImage(text);
    }

    const handleSubmit = () => {
        //updates database
        var formData = new FormData();
        formData.append("recipeName", name);
        formData.append("ingredients", ingredients);
        formData.append("steps", steps);
        //formData.append("img", image);
        //formData.append("tags", tagList)
      
       fetch('http://127.0.0.1:5000/editRecipe', {
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

    const redirectHome = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <View style={{paddingTop: 60, paddingBottom:50}}>
            <Header />
          </View>

          <Image 
              style={{width: 200, height: 150, marginRight: 20, marginBottom: 30}}
              source={{uri:recipe[4]}}/>
        
          <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 700, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Recipe Name</Text>
              <TextInput 
                  style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
                  onChangeText={handleNameChange}
                  value={name}
              />

              <Text style={{fontWeight: 700, paddingTop: 10, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Ingredients</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingright: 50, paddingBottom: 50, paddingTop: 15, paddingLeft: 15 }}
                  onChangeText={handleIngredientsChange}
                  value={ingredients}
              />
  
              <Text style={{fontWeight: 700, paddingTop: 10, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Steps</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingright: 50, paddingBottom: 50, paddingTop: 15, paddingLeft: 15 }}
                  onChangeText={handleStepsChange}
                  value={steps}
              />
              <Text style={{paddingBottom: 5}}>Upload a new image!</Text>
              <input style={{paddingBottom: 20}} type="file" onChange={handleImageChange} />
              <View style={{alignItems: 'center'}}>
            <MyButton width={200} title="Submit" onPressFunction={handleSubmit} />
            </View>

            <View style={{alignItems: 'center', paddingTop: 10}}>
            <MyButton width={200} title="Cancel" onPressFunction={redirectHome} />
            </View>
          </View>
          </View> 
    );
  };
  
  export default RecipeEdit;
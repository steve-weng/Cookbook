
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';

const Home = ({ navigation }) => {

  const [recipes, setRecipes] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Login');
  }

  const redirectAdd = () => {
    navigation.navigate('Add');
  }

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, ingredient.trim()]);
    setIngredient('');
    // keeps cursor in text box
    if (ingredientInputRef.current) {
      ingredientInputRef.current.focus();
    }
    console.log(ingredientList)
    console.log(ingredient)
    var data1 = {"ingredients":ingredient, "steps":steps};
   fetch('http://127.0.0.1:5000/recipe', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
    });
  }

  //useEffect(() => {
   // fetch('/tex').then(res => res.json()).then(data => {
    //  setText(data.text);
    //});
  //}, []);

  const handleButtonPress = () => {
    // Handle button press, e.g., submit the input
   //var data1 = new FormData();
   var data1 = {"firstParam":"thisval", "secondParam":"2ndVal"};
    //data1.append("firstParam", "thisval");
    //data1.append("secondParam", "12");
   fetch('http://127.0.0.1:5000/tex', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
     setText(data.data)
    });
    console.log('Input submitted:', text);
  };

  return (
    <View style={{ padding: 20 }}>
      {recipes.map((item) => (
            console.log(item.name)
        ))}
      <Button title="Add recipe" onPress={redirectAdd} />
      <Button title="Logout" onPress={handleLogout} />
    </View>


  );
};

export default Home;

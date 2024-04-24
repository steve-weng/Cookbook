import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';

const Home = ({ navigation }) => {
  // react states for ingredients and steps
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [steps, setSteps] = useState('');

  const handleIngredientChange = (text) => {
    setIngredient(text);
    console.log(text)
  }

  const handleLogout = () => {
    navigation.navigate('Login');
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

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleAddIngredient();
    }
  }

  const handleStepsChange = (text) => {
    setSteps(text);
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
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
        onChangeText={handleIngredientChange}
        onKeyPress={handleKeyPress}
        value={ingredient}
        placeholder="Enter ingredient"
      />
      <TouchableOpacity onPress={handleAddIngredient}>
        <Text style={{ color: 'blue', marginTop: 10, marginRight: 50 }}>+</Text>
      </TouchableOpacity>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingright: 50, paddingBottom: 50, paddingTop: 15, paddingLeft: 15 }}
        onChangeText={handleStepsChange}
        value={steps}
        placeholder="Enter steps"
      />
      </View>
      <View style={{ marginTop: 10 }}>
        {ingredientList.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;

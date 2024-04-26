import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';

const Home = ({ navigation }) => {
  // react states for ingredients and steps
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [steps, setSteps] = useState('');

  const handleIngredientChange = (text) => {
    setIngredient(text);
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
  }

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleAddIngredient();
    }
  }

  const handleStepsChange = (text) => {
    setSteps(text);
  }

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

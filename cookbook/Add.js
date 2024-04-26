import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import Header from './Header';

const Add = ({ navigation }) => {
  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);

  // Recipe Name
  const handleNameChange = (text) => {
    // logic for storing the recipe name goes here
    setName(text);
  }

  // Ingredients
  const handleIngredientChange = (text) => {
    setIngredient(text);
  }

  const handleKeyPressIngredient = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleAddIngredient();
    }
  }

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, ingredient]);
    setIngredient('');
  }

  // Tags
  const handleTagChange = (text) => {
    setTag(text);
  }

  const handleKeyPressTag = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleAddTag();
    }
  }

  const handleAddTag = () => {
    setTagList([...tagList, tag]);
    setTag('');
  }

  // Steps
  const handleStepsChange = (text) => {
    setSteps(text);
  }

  // Image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  }

  const handleImageUpload = () => {
    // Handle image upload logic here
    //console.log("Image uploaded:", image);
  }

  // this function runs when you press submit
  // function should store recipe name, ingredients, steps, and image 
  // because they havent been stored anywhere yet
  // => accessible through state variables at top
  const handleSubmit = () => {
    // Handle button press, e.g., submit the input

    var recipeData = {
    "recipeName":name,
    "ingredients":ingredientList,
    "steps":steps,
    "img":image
    };

   console.log(ingredientList)
   fetch('http://127.0.0.1:5000/recipe', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipeData),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
    });
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.name}>
        <Text>Recipe Name   </Text>
          <TextInput 
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
              onChangeText={handleNameChange}
              value={name}
              placeholder="Enter recipe name"
          />
      </View>

      <View style={styles.ingredient}>
        <Text>Ingredients   </Text>
          <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
              onChangeText={handleIngredientChange}
              onKeyPress={handleKeyPressIngredient}
              value={ingredient}
              placeholder="Enter ingredient"
          />
          <TouchableOpacity onPress={handleAddIngredient}>
            <Text style={{ color: 'blue', marginTop: 10, marginRight: 50 }}>+</Text>
          </TouchableOpacity>
      </View>

      {/* <View style={styles.tag} */}
        <Text>Tags   </Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
            onChangeText={handleTagChange}
            onKeyPress={handleKeyPressTag}
            value={tag}
            placeholder="Enter tag"
          />
          <TouchableOpacity onPress={handleAddTag}>
            <Text style={{ color: 'blue', marginTop: 10, marginRight: 50 }}>+</Text>
          </TouchableOpacity>
      {/* </View> */}

          
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingright: 50, paddingBottom: 50, paddingTop: 15, paddingLeft: 15 }}
            onChangeText={handleStepsChange}
            value={steps}
            placeholder="Enter steps"
          />
          <input type="file" onChange={handleImageChange} />
          <Button onPress={handleSubmit} title="Submit" />
        <View style={{ marginTop: 10, marginLeft: 200 }}>
            {ingredientList.map((item, index) => (
            <Text key={index}>{item}</Text>
        ))}
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
            {tagList.map((item, index) => (
            <Text key={index}>{item}</Text>
        ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  name: {
    flexDirection: 'row',
  },
  ingredient: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
  },
  header: {
    position: 'absolute',
    alignItems:'center',
    top: "8%",
  },
});

export default Add;
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';
import Header from './Header';
import MyButton from './MyButton';

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
    "img":JSON.stringify(image)
    };

    var formData = new FormData();
    formData.append("recipeName", name);
    formData.append("ingredients", ingredientList);
    formData.append("steps", steps);
    formData.append("img", image);


    console.log(formData.get("recipeName"));
    //recipeData = JSON.stringify(recipeData);
    //console.log(typeof(recipeData));
    //console.log(recipeData);
    //recipeData.img = image;
  
   fetch('http://127.0.0.1:5000/recipe', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
      //'Content-Type': 'application/json'
    },
    body: formData,
    //body: image,
   // body: JSON.stringify(recipeData),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
    });
  };

  return (

      <View style={{ alignItems: 'center'}}>
        <View style={{paddingTop: 60, paddingBottom:50}}>
          <Header />
        </View>
      
        <View style={{flexDirection: 'column'}}>
        <Text style={{paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Recipe Name</Text>
            <TextInput 
                style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
                onChangeText={handleNameChange}
                value={name}
                placeholder="Enter recipe name"
            />

            <Text style={{paddingTop: 10, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Ingredients</Text>
            <View style={{flexDirection: 'row'}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
                onChangeText={handleIngredientChange}
                onKeyPress={handleKeyPressIngredient}
                value={ingredient}
                placeholder="Enter ingredient"
            />
            <TouchableOpacity onPress={handleAddIngredient}>
                <Text style={{ color: "#FFA800", marginTop: 10, marginRight: 50 }}>+</Text>
            </TouchableOpacity>
            </View>

            <Text style={{paddingTop: 10, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Tags</Text>
            <View style={{flexDirection: 'row'}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 20, paddingHorizontal: 10 }}
                onChangeText={handleTagChange}
                onKeyPress={handleKeyPressTag}
                value={tag}
                placeholder="Enter tag"
            />
            <TouchableOpacity onPress={handleAddTag}>
                <Text style={{ color: "#FFA800", marginTop: 10, marginRight: 50 }}>+</Text>
            </TouchableOpacity>
            </View>

            <Text style={{paddingTop: 10, paddingBottom: 5, fontFamily: "PlayfairDisplay", fontSize: 17}}>Steps</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingright: 50, paddingBottom: 50, paddingTop: 15, paddingLeft: 15 }}
                onChangeText={handleStepsChange}
                value={steps}
                placeholder="Enter steps"
            />
            <input style={{paddingBottom: 20}} type="file" onChange={handleImageChange} />
            <View style={{alignItems: 'center'}}>
            <MyButton width={200} title="Submit" onPressFunction={handleSubmit} />
            </View>
        </View>
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

export default Add;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';
import Header from './Header';
import MyButton from './MyButton';

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Login');
  }

  const redirectAdd = () => {
    navigation.navigate('Add');
  }

  const handleSearchChange = (text) => {
    setSearchText(text);
  }

  useEffect(() => {
      var formData = new FormData();
      formData.append("recipeName", searchText);
     fetch('http://127.0.0.1:5000/getRecipes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData,
     })
     .then(res => res.json()).then(data => {
  
      if(data.success) {
        console.log(data);
       // navigate.navigation('Home');
      }
    });
    console.log(searchText);
  }, [searchText]);

  return (
    <View style={{justifyContent:'center', alignItems: 'center'}}>
        <View style={{paddingTop: 60, paddingBottom: 15}}>
          <Header />
        </View>

    <TextInput
        style={{ width: 250, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 50, padding: 10, marginBottom: 20 }}
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchText}
      />

      <View style={{paddingBottom: 12}}>
        <MyButton title="Add recipe" width={200} onPressFunction={redirectAdd} />
      </View>
      
      <View style={{paddingBottom: 12}}>
        <MyButton title="Logout" width={200} onPressFunction={handleLogout} />
      </View>
    </View>


  );
};

export default Home;

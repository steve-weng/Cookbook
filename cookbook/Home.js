
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Login');
  }

  const redirectAdd = () => {
    navigation.navigate('Add');
  }

  const handleSearch = () => {
    // search logic here
    // send searchText to backend and filter out appropriate recipes
    // send recipes back to frontend
  }

  const handleSearchChange = (text) => {
    setSearchText(text);
    console.log(searchText);
  }

  return (
    <View style={{ padding: 20 }}>
    <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20 }}
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={searchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="Add recipe" onPress={redirectAdd} />
      <Button title="Logout" onPress={handleLogout} />
    </View>


  );
};

export default Home;

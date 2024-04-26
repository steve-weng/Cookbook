
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Home = ({ navigation }) => {

  const route = useRoute();
  const recipes = route.params?.recipes || [];

  const handleLogout = () => {
    navigation.navigate('Login');
  }

  const redirectAdd = () => {
    navigation.navigate('Add');
  }

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

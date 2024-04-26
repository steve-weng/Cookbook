import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Header from './Header';
import MyButton from './MyButton';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = Dimensions.get('window');

  const redirectLogin = () => {
    navigation.navigate('Login');
  }

  const handleSignup = () => {
    // Your sign up logic here
    var data = {"username":username, "password":password};
    console.log(data)
   fetch('http://127.0.0.1:5000/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
     if (data.success == true){
      navigation.navigate('Home');
    }
    });
    // After successful sign up, navigate back to login page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <Text style={[styles.registerText, {fontSize: width * 0.03}]}>Sign Up :D</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <MyButton title="Sign Up" onPressFunction={handleSignup} width={200}/>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton title="Back to login" onPressFunction={redirectLogin} width={200}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    alignitems:'center',
    top: "16%",
  },
  registerText: {
    lineHeight: 35,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Playfair Display",
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 3,
    alignItems: 'center',
  }
});

export default Signup;
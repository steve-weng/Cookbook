import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Header from './Header';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = Dimensions.get('window');

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
    });
    // After successful sign up, navigate back to login page
    //navigation.navigate('Login');
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
      <View style={styles.signupButton}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
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
    lineHeight: "35px",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Markazi Text, serif",
    paddingBottom: "20px",
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
  },
  signupButton: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#FFA800",
    width: 200, // make this flexible
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  signupText: {
    color: 'white',
    fontSize: 18, // make this flexible
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Markazi Text, serif",
  },
});

export default Signup;

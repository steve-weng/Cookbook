import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Header from './Header';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = Dimensions.get('window');

  const handleLogin = () => {
    // login code here
    var sendData = {"username":username, "password":password};
   fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
     if (data.success == true){
      navigation.navigate('Home');
    }
    else {
      console.log("failed logged in")
    }
    });

  };

  const redirectSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <Text style={[styles.welcomeText, {fontSize: width * 0.03}]}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.loginButton}>
        <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity style={styles.customButton} onPress={redirectSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
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
  welcomeText: {
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
  loginButton: {
    width: 200, // make this flexible
    paddingTop: 10,
    paddingBottom: 10,
  },
  customButton: {
    backgroundColor: "#FFA800",
    width: 200, // make this flexible
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // make this flexible
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Markazi Text, serif",
  },
});

export default Login;

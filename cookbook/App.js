import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

const InputBox = () => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  //useEffect(() => {
   // fetch('/tex').then(res => res.json()).then(data => {
    //  setText(data.text);
    //});
  //}, []);

  const handleButtonPress = () => {
    // Handle button press, e.g., submit the input
   fetch('http://127.0.0.1:5000/tex').then(res => res.json()).then(data => {
     console.log(data.text);
     setText(data.text)
    });
    console.log('Input submitted:', text);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        onChangeText={handleInputChange}
        value={text}
        placeholder="Type something..."
      />
      <Button
        title="Submit"
        onPress={handleButtonPress}
      />
    </View>
  );
};

export default InputBox;

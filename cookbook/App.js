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
   //var data1 = new FormData();
   var data1 = {"firstParam":"thisval", "secondParam":"2ndVal"};
    //data1.append("firstParam", "thisval");
    //data1.append("secondParam", "12");
   fetch('http://127.0.0.1:5000/tex', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1),
   })
   .then(res => res.json()).then(data => {
     console.log(data);
     setText(data.data)
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

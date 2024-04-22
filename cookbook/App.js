import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const InputBox = () => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    // Handle button press, e.g., submit the input
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

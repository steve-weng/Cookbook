import React from 'react';
import { NavigationContainer, View } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Add from './Add';
import RecipeView from './RecipeView';
import RecipeEdit from './RecipeEdit';

import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold_Italic,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold_Italic,
  PlayfairDisplay_900Black_Italic,
} from '@expo-google-fonts/playfair-display';

const Stack = createStackNavigator();

const App = () => {

let [fontsLoaded] = useFonts({
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_600SemiBold_Italic,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold_Italic,
  PlayfairDisplay_900Black_Italic,
});


if(!fontsLoaded) {
  return <AppLoading />
} else {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="RecipeView" component={RecipeView} />
        <Stack.Screen name="RecipeEdit" component={RecipeEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
};

export default App;
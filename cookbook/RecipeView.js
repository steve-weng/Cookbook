import React from 'react';
import { View, Text } from 'react-native';

const RecipeView = () => {
    const route = useRoute(); 
    const recipe = route.params.recipe[1];

    return (
        <View style={{alignItens: 'center'}}>
            <Text>{recipe}</Text>
        </View>
    );
}

export default RecipeView;
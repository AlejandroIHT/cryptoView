import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import FavoritesDetailScreen from './FavoritesDetailScreen'
import Colors from 'cryptoView/src/res/colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favoritos" component={FavoritesScreen} />
      <Stack.Screen name="FavCoinDetails" component={FavoritesDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;

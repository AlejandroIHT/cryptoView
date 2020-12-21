import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InicioScreen from './InicioScreen';
import CoinDetailScreen from '../CoinsDetail/CoinDetailScreen'
import Colors from 'cryptoView/src/res/colors';

const Stack = createStackNavigator();

const InicioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default InicioStack;

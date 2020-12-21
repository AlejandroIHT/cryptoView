import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack';
import InicioStack from './src/components/home/InicioStack';
import Colors from 'cryptoView/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          activeTintColor: '#F7931A',
          style: {
            backgroundColor: Colors.blackPearl,
            borderTopWidth: 4,
            borderBottomWidth: 4,
            borderColor: Colors.blackPearl,
            borderTopColor: Colors.blackPearl,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -6,
            },
            shadowRadius: 0,
            shadowOpacity: 1.0,
            elevation: 10,
          },
        }}>
        <Tabs.Screen
          name="Inicio"
          component={InicioStack}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{tintColor: color, width: 20, height: 20}}
                source={require('cryptoView/src/assets/inicio.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: 20, height: 20}}
                source={require('cryptoView/src/assets/coins.png')}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Favoritos"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{tintColor: color, width: 20, height: 20}}
                source={require('cryptoView/src/assets/fav.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;

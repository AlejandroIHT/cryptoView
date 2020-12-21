import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from 'cryptoView/src/res/colors';

const CoinMarketsItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <Text style={styles.priceText}>{`$${
        Math.round(item.price_usd * 100) / 100
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blackPearl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 4,
    marginRight: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7931A',
    width: 100,
    height: 30,
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    marginBottom: 16,
  },
  nameText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  priceText: {
    color: Colors.white,
    marginBottom: 20,
  },
});

export default CoinMarketsItem;

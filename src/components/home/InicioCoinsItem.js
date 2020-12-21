import React from 'react';
import {View, Text, Image, Pressable, StyleSheet, Platform} from 'react-native';
import Colors from 'cryptoView/src/res/colors';
import 'intl';
import 'intl/locale-data/jsonp/en';

const InicioCoinsItem = ({item, onPress, oneHour, hours, days}) => {
  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.containerPar}>
          <View style={styles.containerCoin}>
            <Image
              style={styles.nameImg}
              source={{uri: getSymbolIcon(item.name)}}
            />
            <Text style={styles.symbolText}>{item.symbol}</Text>
            <Text style={styles.vsSymbolText}>/USD</Text>
          </View>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.containerPrice}>
          <Text style={styles.priceText}>{`$${Intl.NumberFormat().format(item.price_usd)}`}</Text>
        </View>
      </View>

      {oneHour && (
        <View
          style={
            item.percent_change_1h >= 0
              ? styles.containerPercentGreen
              : styles.containerPercentRed
          }>
          <Text style={styles.percentText}>{`${item.percent_change_1h}%`}</Text>
        </View>
      )}
      {hours && (
        <View
          style={
            item.percent_change_24h >= 0
              ? styles.containerPercentGreen
              : styles.containerPercentRed
          }>
          <Text
            style={styles.percentText}>{`${item.percent_change_24h}%`}</Text>
        </View>
      )}
      {days && (
        <View
          style={
            item.percent_change_7d >= 0
              ? styles.containerPercentGreen
              : styles.containerPercentRed
          }>
          <Text style={styles.percentText}>{`${item.percent_change_7d}%`}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
    paddingTop: 12,
    borderBottomColor: 'rgba(0,0,0,0.24)',
    borderBottomWidth: 1,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
    marginRight: Platform.OS == 'ios' ? 16 : 0,
  },
  containerPar: {
    width: '54%',
    flexDirection: 'column',
  },
  containerCoin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 4,
  },
  vsSymbolText: {
    color: Colors.white,
    fontSize: 8,
    marginRight: 12,
  },
  nameText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: 24,
  },
  nameImg: {
    width: 16,
    height: 16,
  },
  priceText: {
    color: Colors.white,
    fontSize: 14,
  },
  containerPercentRed: {
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    backgroundColor: '#e15050',
  },
  containerPercentGreen: {
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    backgroundColor: '#2CC66C',
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default InicioCoinsItem;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from 'cryptoView/src/res/colors';
import 'intl';
import 'intl/locale-data/jsonp/en';

const InicioItemMarket = ({item}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.textHeader}>{`${item.title}:`}</Text>
      <Text style={styles.textBody}>{item.title === "24h Volumen" ? `$${Intl.NumberFormat().format(item.data)}` : `${item.data}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.blackPearl,
    margin: 8,
    marginRight: 0,
    marginBottom: 0,
    padding: 16,
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 25,
  },
  textHeader: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  textBody: {
    color: Colors.white,
    fontSize: 12,
  },
});

export default InicioItemMarket;

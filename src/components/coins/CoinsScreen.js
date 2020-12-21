import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Http from '../../libs/http';
import CoinsSerach from './CoinsSearch';

import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';

class CoinsScreen extends React.Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
    refreshing: false,
  };

  componentDidMount() {
    this.getCoins();
  }

  getCoins = async () => {
    if (!this.state.refreshing) {
      this.setState({loading: true});
    }
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({
      coins: res.data,
      allCoins: res.data,
      loading: false,
      refreshing: false,
    });
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;

    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({coins: coinsFiltered});
  };

  handleRefresh = () => {
    this.setState({refreshing: true}, () => this.getCoins());
  };

  render() {
    const {coins, loading, refreshing} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CoinsSerach onChange={this.handleSearch} />
        <View style={styles.containerSubTitle}>
          <View style={styles.containerPar}>
            <Text style={styles.parText}>Par</Text>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.priceText}>Precio</Text>
          </View>
          <View style={styles.containerChange}>
            <Text style={styles.changeText}>1h Cam%</Text>
          </View>
        </View>
        <FlatList
          data={coins}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              colors={[Colors.blackPearl]}
              progressBackgroundColor={'#F7931A'}
            />
          }
          keyExtractor={(item) => item.symbol}
          ListHeaderComponent={
            <>
              {loading ? (
                <ActivityIndicator
                  style={styles.loader}
                  color="white"
                  size="large"
                />
              ) : null}
            </>
          }
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 4,
  },
  containerPar: {
    width: '40%',
  },
  containerPrice: {
    width: '35%',
  },
  containerChange: {
    width: '25%',
    alignItems: 'flex-end',
  },
  parText: {
    paddingLeft: 24,
    color: 'rgba(255,255,255,0.5)',
  },
  priceText: {
    color: 'rgba(255,255,255,0.5)',
  },
  changeText: {
    color: 'rgba(255,255,255,0.5)',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;

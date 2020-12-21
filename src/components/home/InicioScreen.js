import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Http from '../../libs/http';
import Colors from 'cryptoView/src/res/colors';
import InicioItemMarket from './InicioItemMarket';
import InicioCoinsItem from './InicioCoinsItem';
import 'intl';
import 'intl/locale-data/jsonp/en';

class InicioScreen extends React.Component {
  state = {
    coins: [],
    coinsUp: [],
    coinsDown: [],
    data: [],
    coinsUpActive: true,
    changeOneH: true,
    changeHours: false,
    changeDays: false,
    loading: false,
    refreshing: false,
  };

  componentDidMount() {
    this.getDataAll();
  }

  getDataAll = async () => {
    await this.getCoins();
    this.getTopUp();
    this.getTopDow();
    this.setState({refreshing: false});
  };

  getCoins = async () => {
    if (!this.state.refreshing) {
      this.setState({loading: true});
    }
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    const data = await Http.instance.get(
      'https://api.coinlore.net/api/global/',
    );

    this.setState({coins: res.data, data: data[0], loading: false});
  };

  getTopUp = () => {
    const {coins, changeOneH, changeHours, changeDays} = this.state;
    let order = [];

    for (var i = 0; i < coins.length; i++) {
      order[i] = coins[i];
    }

    if (changeOneH) {
      order = order.sort((a, b) => b.percent_change_1h - a.percent_change_1h);
      order.splice(5, 99);
      this.setState({coinsUp: order});
      return;
    }

    if (changeHours) {
      order = order.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      order.splice(5, 99);
      this.setState({coinsUp: order});
      return;
    }

    if (changeDays) {
      order = order.sort((a, b) => b.percent_change_7d - a.percent_change_7d);
      order.splice(5, 99);
      this.setState({coinsUp: order});
      return;
    }
  };

  getTopDow = () => {
    const {coins, changeOneH, changeHours, changeDays} = this.state;
    let order = [];

    for (var i = 0; i < coins.length; i++) {
      order[i] = coins[i];
    }

    if (changeOneH) {
      order = order.sort((a, b) => a.percent_change_1h - b.percent_change_1h);
      order.splice(5, 99);
      this.setState({coinsDown: order});
    }

    if (changeHours) {
      order = order.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
      order.splice(5, 99);
      this.setState({coinsDown: order});
    }

    if (changeDays) {
      order = order.sort((a, b) => a.percent_change_7d - b.percent_change_7d);
      order.splice(5, 99);
      this.setState({coinsDown: order});
    }
  };

  handlePressUp = () => {
    if (this.state.coinsUpActive) {
      return;
    } else {
      this.setState({coinsUpActive: true});
    }
  };

  handlePressDown = () => {
    if (this.state.coinsUpActive) {
      this.setState({coinsUpActive: false});
      return;
    } else {
      return;
    }
  };

  handlePressChangeOneH = () => {
    const {changeOneH} = this.state;

    if (changeOneH === true) {
      return;
    } else {
      this.setState(
        {changeOneH: true, changeHours: false, changeDays: false},
        () => {
          this.getTopUp();
          this.getTopDow();
        },
      );
    }
  };

  handlePressChangeHours = () => {
    const {changeHours} = this.state;

    if (changeHours === true) {
      return;
    } else {
      this.setState(
        {changeOneH: false, changeHours: true, changeDays: false},
        () => {
          this.getTopUp();
          this.getTopDow();
        },
      );
    }
  };

  handlePressChangeDays = () => {
    const {changeDays} = this.state;

    if (changeDays === true) {
      return;
    } else {
      this.setState(
        {changeOneH: false, changeHours: false, changeDays: true},
        () => {
          this.getTopUp();
          this.getTopDow();
        },
      );
    }
  };

  hendlePressItem = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleRefresh = () => {
    this.setState({refreshing: true}, () => this.getDataAll());
  };

  cost = (number) => {
    let total = Math.round(number).toString();
    let i = 0;
    let large = total.length;
    let numberString = '';
    let negativeNumber = '';

    if ('-' === total.charAt(0)) {
      negativeNumber = '-';
      total = total.substr(1, large - 1);
      large -= 1;
    }

    do {
      if (i === 0) {
        if (large <= 3) {
          large = -3;
          numberString = total;
        } else {
          i++;
          large -= 3;
          numberString = `.${total.substr(large, 3)}`;
        }
      }
      if (i !== 0 && large > 3) {
        large -= 3;
        numberString = `.${total.substr(large, 3)}${numberString}`;
      } else {
        numberString = `${total.substr(0, large)}${numberString}`;
        large -= 3;
      }
    } while (large > 0);

    if (negativeNumber === '-') {
      numberString = `-${numberString}`;
    }

    return numberString;
  };

  render() {
    const {data} = this.state;
    const total_mcap = Intl.NumberFormat().format(data.total_mcap);
    const {
      loading,
      refreshing,
      coinsUp,
      coinsDown,
      coinsUpActive,
      changeOneH,
      changeHours,
      changeDays,
    } = this.state;
    const dataList = [
      {data: data.total_volume, title: '24h Volumen'},
      {data: this.cost(data.active_markets), title: 'Mercados activos'},
      {data: `${data.btc_d}%`, title: 'Dominio de BTC'},
      {data: `${data.eth_d}%`, title: 'Dominio de ETH'},
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View contentContainerStyle={styles.scrollView}>
          <FlatList
            data={coinsUpActive ? coinsUp : coinsDown}
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
                <View style={styles.containerBanner}>
                  <Image
                    style={styles.imgBanner}
                    source={require('cryptoView/src/assets/banner-home.png')}
                  />
                </View>
                <View style={styles.detailMarket}>
                  <View style={styles.rowMarketCap}>
                    <Image
                      style={styles.marketCapImg}
                      source={require('cryptoView/src/assets/bank.png')}
                    />
                    <Text style={styles.textHeaderMC}>Market Cap:</Text>
                    <Text style={styles.textBody}>{`$${total_mcap}`}</Text>
                  </View>
                  <View style={styles.containerDetailMarket}>
                    <FlatList
                      style={styles.containerList}
                      horizontal={true}
                      data={dataList}
                      keyExtractor={(item) => item.title}
                      renderItem={({item}) => <InicioItemMarket item={item} />}
                    />
                  </View>
                </View>
                <View style={styles.containerPress}>
                  <Pressable
                    style={
                      coinsUpActive ? styles.pessTopActive : styles.pessTop
                    }
                    onPress={this.handlePressUp}>
                    <Text
                      style={
                        coinsUpActive
                          ? styles.textBtnTopActive
                          : styles.textBtnTop
                      }>
                      Top 5 ganadoras
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      coinsUpActive ? styles.pessTop : styles.pessTopActive
                    }
                    onPress={this.handlePressDown}>
                    <Text
                      style={
                        coinsUpActive
                          ? styles.textBtnTop
                          : styles.textBtnTopActive
                      }>
                      Top 5 perdedoras
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.containerPressChange}>
                  <Pressable
                    onPress={this.handlePressChangeOneH}
                    style={
                      changeOneH ? styles.pressChangeActive : styles.pressChange
                    }>
                    <Text
                      style={
                        changeOneH
                          ? styles.pressChangeTextActive
                          : styles.pressChangeText
                      }>
                      1h Cam%
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={this.handlePressChangeHours}
                    style={
                      changeHours
                        ? styles.pressChangeActive
                        : styles.pressChange
                    }>
                    <Text
                      style={
                        changeHours
                          ? styles.pressChangeTextActive
                          : styles.pressChangeText
                      }>
                      24h Cam%
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={this.handlePressChangeDays}
                    style={
                      changeDays ? styles.pressChangeActive : styles.pressChange
                    }>
                    <Text
                      style={
                        changeDays
                          ? styles.pressChangeTextActive
                          : styles.pressChangeText
                      }>
                      7d Cam%
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.containerSubTitle}>
                  <View style={styles.containerPar}>
                    <Text style={styles.parText}>Par</Text>
                  </View>
                  <View style={styles.containerPrice}>
                    <Text style={styles.priceText}>Precio</Text>
                  </View>
                  <View style={styles.containerChange}>
                    {changeOneH && (
                      <Text style={styles.changeText}>1h Cam%</Text>
                    )}
                    {changeHours && (
                      <Text style={styles.changeText}>24h Cam%</Text>
                    )}
                    {changeDays && (
                      <Text style={styles.changeText}>7d Cam%</Text>
                    )}
                  </View>
                </View>
                {loading && (
                  <ActivityIndicator
                    style={styles.loader}
                    color="white"
                    size="large"
                  />
                )}
              </>
            }
            renderItem={
              coinsUpActive
                ? ({item}) => (
                    <InicioCoinsItem
                      item={item}
                      onPress={() => this.hendlePressItem(item)}
                      oneHour={changeOneH}
                      hours={changeHours}
                      days={changeDays}
                    />
                  )
                : ({item}) => (
                    <InicioCoinsItem
                      item={item}
                      onPress={() => this.hendlePressItem(item)}
                      oneHour={changeOneH}
                      hours={changeHours}
                      days={changeDays}
                    />
                  )
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  scrollView: {
    flex: 1,
  },
  containerBanner: {
    height: 100,
    backgroundColor: Colors.blackPearl,
    margin: 16,
    marginTop: 8,
    marginBottom: 0,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 4,
  },
  imgBanner: {
    width: '100%',
    height: '100%',
  },
  containerDetailMarket: {
    flexDirection: 'row',
  },
  containerSubTitle: {
    flexDirection: 'row',
    marginTop: 8,
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
  containerPress: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  containerPressChange: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
  },
  rowMarketCap: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.blackPearl,
    margin: 16,
    marginTop: 8,
    marginBottom: 0,
    padding: 16,
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F7931A',
  },
  marketCapImg: {
    width: 15,
    height: 15,
    marginRight: 8,
    marginLeft: 8,
  },
  containerList: {
    marginLeft: 8,
    paddingBottom: 8,
  },
  detailMarket: {
    flexDirection: 'column',
  },
  textHeaderMC: {
    color: '#F7931A',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  textBody: {
    color: Colors.white,
    fontSize: 12,
  },
  pessTop: {
    paddingBottom: 8,
    marginRight: 24,
  },
  pessTopActive: {
    paddingBottom: 8,
    marginRight: 24,
    borderBottomWidth: 2,
    borderColor: '#F7931A',
    borderRadius: 4,
  },
  textBtnTop: {
    color: Colors.white,
    fontSize: 16,
  },
  textBtnTopActive: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 60,
  },
  pressChangeActive: {
    backgroundColor: Colors.blackPearl,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F7931A',
    marginRight: 8,
  },
  pressChange: {
    backgroundColor: Colors.blackPearl,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.blackPearl,
    marginRight: 8,
  },
  pressChangeTextActive: {
    color: '#F7931A',
    fontSize: 12,
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
  },
  pressChangeText: {
    color: Colors.white,
    fontSize: 12,
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default InicioScreen;

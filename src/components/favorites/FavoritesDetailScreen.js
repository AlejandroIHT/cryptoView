import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FavoritesMarketsItem from './FavoritesMarketsItem';
import Colors from 'cryptoView/src/res/colors';
//Cuando hay muchos puntos, recomiendo hacer una ruta absoluta
import Http from '../../libs/http';
import Storage from 'cryptoView/src/libs/storage';
import 'intl';
import 'intl/locale-data/jsonp/en';

class FavoritesDetailScreen extends React.Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
    loading: false,
  };

  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavotite();
    }
  };

  addFavotite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = () => {
    Alert.alert('Eliminar de favoritos', '¿Estas seguro?', [
      {
        text: 'cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'eliminar',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({isFavorite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  getFavorite = async () => {
    const key = `favorite-${this.state.coin.id}`;
    try {
      const favStr = await Storage.instance.get(key);

      if (favStr !== null) {
        this.setState({isFavorite: true});
      }
    } catch (error) {
      console.log('get favorite error', error);
    }
  };

  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [`$${Intl.NumberFormat().format(coin.market_cap_usd)}`],
      },
      {
        title: 'Volumen en 24h',
        data: [`$${Intl.NumberFormat().format(coin.volume24)}`],
      },
      {
        title: 'Cambio en 24h',
        data: [`${coin.percent_change_24h}%`],
      },
    ];

    return sections;
  };

  getMarkets = async (coinId) => {
    this.setState({loading: true});
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);

    this.setState({markets, loading: false});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});

    this.getMarkets(coin.id);

    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  render() {
    const {coin, markets, isFavorite, loading} = this.state;

    return (
      <View style={styles.container}>
        <Pressable onPress={this.toogleFavorite} style={[styles.btnFavorite]}>
          {isFavorite ? (
            <View style={styles.containerFav}>
              <Image
                style={styles.btnImgFav}
                source={require('cryptoView/src/assets/favRemove.png')}
              />
              <Text
                style={isFavorite ? styles.textFavAdd : styles.textFavRemove}>
                {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
              </Text>
            </View>
          ) : (
            <View style={styles.containerFav}>
              <Image
                style={styles.btnImgFav}
                source={require('cryptoView/src/assets/fav.png')}
              />
              <Text
                style={isFavorite ? styles.textFavAdd : styles.textFavRemove}>
                {isFavorite ? 'Añadido a favoritos' : 'Agregar a favoritos'}
              </Text>
            </View>
          )}
        </Pressable>
        <View style={styles.subHeader}>
          <ImageBackground
            style={styles.imgHeader}
            source={require('cryptoView/src/assets/background-header.png')}>
            <View style={styles.containerName}>
              <Image
                style={styles.iconImg}
                source={{uri: this.getSymbolIcon(coin.name)}}
              />
              <Text style={styles.titleText}>{coin.name}</Text>
            </View>
          </ImageBackground>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketsTitle}>Precio en los exchanges</Text>
        {loading ? (
          <ActivityIndicator style={styles.loader} color="white" size="large" />
        ) : null}
        <FlatList
          style={styles.listStyle}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <FavoritesMarketsItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    height: 100,
    backgroundColor: Colors.blackPearl,
    borderRadius: 4,
    padding: 16,
    margin: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 4
  },
  imgHeader: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    resizeMode: 'cover',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerName: {
    flexDirection: 'row',
    width: '65%',
  },
  listStyle: {
    maxHeight: 100,
    marginLeft: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 250,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
    borderRadius: 4,
  },
  sectionItem: {
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
    paddingBottom: 16,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 8,
  },
  containerFav: {
    flexDirection: 'row',
    margin: 8,
    marginBottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textFavAdd: {
    color: '#E15050',
    marginLeft: 8,
  },
  textFavRemove: {
    color: Colors.white,
    marginLeft: 8,
  },
  btnFavorite: {
    alignItems: 'center',
    borderWidth: 0,
  },
  btnImgFav: {
    width: 24,
    height: 24,
  },
});

export default FavoritesDetailScreen;
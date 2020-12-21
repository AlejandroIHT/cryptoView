import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavotitesEmptyState';
import Colors from 'cryptoView/src/res/colors';
import Storage from 'cryptoView/src/libs/storage';
import CoinsItem from 'cryptoView/src/components/coins/CoinsItem';

class FavoritesScreen extends React.Component {
  state = {
    favorites: [],
  };

  getFavorite = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      this.setState({favorites});
    } catch (error) {
      console.log('getfavorite error', error);
    }
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('FavCoinDetails', {coin});
  };

  componentDidMount() {
    this.getFavorite();

    this.props.navigation.addListener('focus', this.getFavorite);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorite);
  }

  render() {
    const {favorites} = this.state;

    return (
      <View style={styles.container}>
        {favorites.length === 0 ? <FavoritesEmptyState /> : null}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;

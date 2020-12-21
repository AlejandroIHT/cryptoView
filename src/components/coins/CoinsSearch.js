import React from 'react';
import {TextInput, Platform, View, Image, StyleSheet} from 'react-native';
import Colors from 'cryptoView/src/res/colors';

class CoinsSearch extends React.Component {
  state = {
    query: '',
  };

  handleText = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const {query} = this.state;

    return (
      <View>
        <View style={styles.container}>
          <Image
            style={styles.iconSearch}
            source={require('cryptoView/src/assets/search-yellow.png')}
          />
          <TextInput
            style={[
              styles.textInput,
              Platform.OS == 'ios'
                ? styles.textInputIOS
                : styles.textInputAndroid,
            ]}
            onChangeText={this.handleText}
            value={query}
            placeholder="Busca una moneda"
            placeholderTextColor="rgba(247,147,26,0.4)"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Colors.blackPearl,
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  textInput: {
    height: 40,
    width: '88%',
    marginLeft: 4,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#F7931A',
  },
  iconSearch: {
    width: 16,
    height: 16,
    marginLeft: 12,
  },
  textInputAndroid: {
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.24)',
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;

import React, { Component, PureComponent } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class Products extends Component {
  render() {
    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    return (
      <View style={customStyles.container}>
        <FlatList
          data={this.props.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index, separators }) => {
            const { image, name, price } = item;
            return (
              <TouchableOpacity style={customStyles.listItem} onPress={() => {
                this.props.navigation.navigate('ProductDetails', { id: 0 });
              }}>
                <Image source={{ uri: image }} style={{ width: imageWidth, height: imageHeight, borderRadius: 4 }} />
                <View style={customStyles.title}>
                  <Text style={customStyles.name}>{name}</Text>
                  <Text style={customStyles.price}>${price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={2}
        />
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 16
  },
  listItem: {
    margin: 8
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  name: {
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  price: {
    color: '#ef3475',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  product: { products }
}) => ({
  products
});

export default compose(
  withNavigation,
  connect(mapStateToProps)
)(Products);

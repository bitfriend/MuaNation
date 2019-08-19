import React, { Component, PureComponent } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

class Products extends Component {
  render() {
    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    let images = [];
    this.props.products.map((product) => images.push(product.image));

    return (
      <View style={customStyles.container}>
        <ImageCacheProvider
          urlsToPreload={images}
          onPreloadComplete={() => console.log('images cached')}
        >
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity style={customStyles.listItem} onPress={() => {
                this.props.navigation.navigate('ProductDetails', { id: 0 });
              }}>
                <Product {...item} />
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </ImageCacheProvider>
      </View>
    );
  }
}

class Product extends PureComponent {
  render() {
    const { image, name, price } = this.props;

    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    return (
      <View>
        <CachedImage source={{ uri: image }} style={{ width: imageWidth, height: imageHeight, borderRadius: 4 }} />
        <View style={customStyles.title}>
          <Text style={customStyles.name}>{name}</Text>
          <Text style={customStyles.price}>${price}</Text>
        </View>
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

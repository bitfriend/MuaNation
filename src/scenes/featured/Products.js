import React, { Component, PureComponent } from 'react';
import { Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import colors from '../../components/theme/colors';

class Products extends Component {
  render() {
    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    let images = [];
    this.props.products.map((product) => images.push(product.image));

    return (
      <ImageCacheProvider urlsToPreload={images}>
        <View style={styles.container}>
          <Text style={styles.heading}>SALE</Text>
          <View style={{ height: 348 }}>
            <FlatList
              data={this.props.products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('SaleProduct', { id: 0 });
                }}>
                  <View style={styles.listItem}>
                    <SaleProduct {...item} />
                  </View>
                </TouchableOpacity>
              )}
              horizontal
            />
          </View>
          <Text style={styles.heading}>POPULAR</Text>
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('PopularProduct', { id: 0 });
              }}>
                <View style={styles.listItem}>
                  <PopularProduct {...item} />
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
      </ImageCacheProvider>
    );
  }
}

const saleProductWidth = 254;

class SaleProduct extends PureComponent {
  render() {
    return (
      <View style={saleStyles.container}>
        <CachedImage source={{ uri: this.props.image }} style={{ width: saleProductWidth, height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
        <View style={{ padding: 16 }}>
          <Text style={saleStyles.name}>{this.props.name}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={saleStyles.overview}>{this.props.overview}</Text>
          <View style={saleStyles.title}>
            <Text style={saleStyles.extra}>{this.props.extra}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={saleStyles.symbol}>$</Text>
              <Text style={saleStyles.price}>{this.props.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class PopularProduct extends PureComponent {
  render() {
    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    return (
      <View>
        <CachedImage source={{ uri: this.props.image }} style={{ width: imageWidth, height: imageHeight, borderRadius: 8 }} />
        <View style={popularStyles.title}>
          <Text style={popularStyles.name}>{this.props.name}</Text>
          <Text style={popularStyles.price}>${this.props.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16
  },
  heading: {
    marginHorizontal: 8,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  },
  listItem: {
    margin: 8
  }
});

const saleStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: colors.sealBrown,
    ...Platform.select({
      ios: {
        shadowRadius: 24,
        shadowColor: colors.sealBrown,
        shadowOpacity: 1,
        shadowOffset: { width: 3, height: 16 }
      },
      android: {
        elevation: 16
      }
    })
  },
  name: {
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: saleProductWidth - 16 * 2,
    color: colors.taupe,
    fontFamily: 'Roboto',
    fontSize: 14
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  extra: {
    backgroundColor: colors.pastelOrange,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: colors.taupe,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  symbol: {
    marginRight: 4,
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  price: {
    color: colors.smokyBlack,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

const popularStyles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  name: {
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1
  },
  price: {
    color: colors.mulberry,
    fontFamily: 'Roboto',
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

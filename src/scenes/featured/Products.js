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
        <View style={{
          ...styles.container,
          backgroundColor: this.props.customTheme.container
        }}>
          <Text style={{
            ...styles.heading,
            color: this.props.customTheme.heading
          }}>SALE</Text>
          <View style={{ height: 348 }}>
            <FlatList
              data={this.props.products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('SaleProduct', { id: 0 });
                }}>
                  <View style={styles.listItem}>
                    <SaleProduct {...item} customTheme={this.props.customTheme} />
                  </View>
                </TouchableOpacity>
              )}
              horizontal
            />
          </View>
          <Text style={{
            ...styles.heading,
            color: this.props.customTheme.heading
          }}>POPULAR</Text>
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('PopularProduct', { id: 0 });
              }}>
                <View style={styles.listItem}>
                  <PopularProduct {...item} customTheme={this.props.customTheme} />
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
      <View style={{
        borderRadius: 12,
        backgroundColor: this.props.customTheme.card,
        ...this.props.customTheme.shadows[3]
      }}>
        <CachedImage source={{ uri: this.props.image }} style={{ width: saleProductWidth, height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
        <View style={{ padding: 16 }}>
          <Text style={{
            ...saleStyles.name,
            color: this.props.customTheme.title
          }}>{this.props.name}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{
            ...saleStyles.overview,
            color: this.props.customTheme.label
          }}>{this.props.overview}</Text>
          <View style={saleStyles.title}>
            <Text style={{
              ...saleStyles.extra,
              color: this.props.customTheme.extra,
              backgroundColor: this.props.customTheme.palette.warning
            }}>{this.props.extra}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{
                ...saleStyles.symbol,
                color: this.props.customTheme.title
              }}>$</Text>
              <Text style={{
                ...saleStyles.price,
                color: this.props.customTheme.title
              }}>{this.props.price.toFixed(2)}</Text>
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
          <Text style={{
            ...popularStyles.name,
            color: this.props.customTheme.title
          }}>{this.props.name}</Text>
          <Text style={{
            ...popularStyles.price,
            color: this.props.customTheme.palette.secondary
          }}>${this.props.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16
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
  name: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: saleProductWidth - 16 * 2,
    fontFamily: 'Roboto',
    fontSize: 14
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  extra: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  symbol: {
    marginRight: 4,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  price: {
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
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1
  },
  price: {
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  product: { products }
}) => ({
  customTheme: theme,
  products
});

export default compose(
  withNavigation,
  connect(mapStateToProps)
)(Products);

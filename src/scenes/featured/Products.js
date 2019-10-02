import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const saleImageWidth = verticalScale(254);

class Products extends Component {
  componentDidMount() {
    const { width } = Dimensions.get('window');
    this.popularImageWidth = (width - verticalScale(16) * 3) / 2;
    this.popularImageHeight = Math.floor(this.popularImageWidth * 0.8);
  }

  renderSaleProduct = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('SaleProduct', { id: 0 });
      }}>
        <View style={styles.listItem}>
          <View style={{
            borderRadius: verticalScale(12),
            backgroundColor: this.props.customTheme.card,
            ...this.props.customTheme.shadows[3]
          }}>
            <FastImage
              style={{
                width: saleImageWidth,
                height: verticalScale(180),
                borderTopLeftRadius: verticalScale(12),
                borderTopRightRadius: verticalScale(12)
              }}
              source={{ uri: item.image }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ padding: verticalScale(16) }}>
              <Text style={{
                ...saleStyles.name,
                color: this.props.customTheme.title
              }}>{item.name}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={{
                ...saleStyles.overview,
                color: this.props.customTheme.label
              }}>{item.overview}</Text>
              <View style={saleStyles.caption}>
                <Text style={{
                  ...saleStyles.extra,
                  color: this.props.customTheme.extra,
                  backgroundColor: this.props.customTheme.palette.warning
                }}>{item.extra}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={{
                    ...saleStyles.symbol,
                    color: this.props.customTheme.title
                  }}>$</Text>
                  <Text style={{
                    ...saleStyles.price,
                    color: this.props.customTheme.title
                  }}>{item.price.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderPopularProduct = ({ item, index, separators }) => {
    return (
      <TouchableOpacity style={{
        ...styles.listItem,
        width: this.popularImageWidth // Must psecify the width of item for multi-column list
      }} onPress={() => {
        this.props.navigation.navigate('PopularProduct', { id: 0 });
      }}>
        <FastImage
          style={{
            width: this.popularImageWidth,
            height: this.popularImageHeight,
            borderRadius: verticalScale(8)
          }}
          source={{ uri: item.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={popularStyles.caption}>
          <Text style={{
            ...popularStyles.name,
            color: this.props.customTheme.title
          }}>{item.name}</Text>
          <Text style={{
            ...popularStyles.price,
            color: this.props.customTheme.palette.secondary
          }}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
        <Text style={{
          ...styles.heading,
          color: this.props.customTheme.heading
        }}>SALE</Text>
        <View style={{ height: verticalScale(348) }}>
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderSaleProduct}
            horizontal
            ListHeaderComponent={() => <View style={{ width: verticalScale(8) }} />}
            ListFooterComponent={() => <View style={{ width: verticalScale(8) }} />}
          />
        </View>
        <Text style={{
          ...styles.heading,
          color: this.props.customTheme.heading
        }}>POPULAR</Text>
        <FlatList
          data={this.props.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderPopularProduct}
          numColumns={2}
          style={{ paddingHorizontal: verticalScale(8) }}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: '16@vs'
  },
  heading: {
    marginHorizontal: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  listItem: {
    margin: '8@vs'
  }
});

const saleStyles = ScaledSheet.create({
  name: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: verticalScale(saleImageWidth - 16 * 2),
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '16@vs'
  },
  extra: {
    borderRadius: '4@vs',
    paddingHorizontal: '4@vs',
    paddingVertical: '2@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  symbol: {
    marginRight: '4@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  price: {
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  }
});

const popularStyles = ScaledSheet.create({
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '8@vs'
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
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

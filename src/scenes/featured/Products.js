import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const saleImageWidth = 254;

class Products extends Component {
  componentDidMount() {
    const { width } = Dimensions.get('window');
    this.popularImageWidth = (width - EStyleSheet.value('16rem') * 3) / 2;
    this.popularImageHeight = this.popularImageWidth * 0.8;
  }

  renderSaleProduct = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('SaleProduct', { id: 0 });
      }}>
        <View style={styles.listItem}>
          <View style={{
            ...styles.listItemWrapper,
            ...this.props.appTheme.styles.shadow4
          }}>
            <FastImage style={saleStyles.banner} source={{ uri: item.image }} resizeMode={FastImage.resizeMode.cover} />
            <View style={saleStyles.body}>
              <Text style={saleStyles.name}>{item.name}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={saleStyles.overview}>{item.overview}</Text>
              <View style={saleStyles.caption}>
                <Text style={saleStyles.extra}>{item.extra}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={saleStyles.symbol}>$</Text>
                  <Text style={saleStyles.price}>{item.price.toFixed(2)}</Text>
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
            borderRadius: EStyleSheet.value('8rem')
          }}
          source={{ uri: item.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={popularStyles.caption}>
          <Text style={popularStyles.name}>{item.name}</Text>
          <Text style={popularStyles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>SALE</Text>
        <View style={saleStyles.listWrapper}>
          <FlatList
            data={this.props.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderSaleProduct}
            horizontal
            ListHeaderComponent={() => <View style={saleStyles.listHeader} />}
            ListFooterComponent={() => <View style={saleStyles.listFooter} />}
          />
        </View>
        <Text style={styles.heading}>POPULAR</Text>
        <FlatList
          data={this.props.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderPopularProduct}
          numColumns={2}
          style={popularStyles.list}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '16rem',
    backgroundColor: '$container'
  },
  heading: {
    marginHorizontal: '16rem',
    color: '$heading',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  listItemWrapper: {
    borderRadius: '12rem',
    backgroundColor: '$card',
  },
  listItem: {
    margin: '8rem'
  }
});

const saleStyles = EStyleSheet.create({
  listWrapper: {
    height: '348rem'
  },
  listHeader: {
    width: '8rem'
  },
  listFooter: {
    width: '8rem'
  },
  banner: {
    width: EStyleSheet.value(saleImageWidth + 'rem'),
    height: '180rem',
    borderTopLeftRadius: '12rem',
    borderTopRightRadius: '12rem'
  },
  body: {
    padding: '16rem'
  },
  name: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: EStyleSheet.value(`${saleImageWidth - 16 * 2}rem`),
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '16rem'
  },
  extra: {
    borderRadius: '4rem',
    paddingHorizontal: '4rem',
    paddingVertical: '2rem',
    backgroundColor: '$warningColor',
    color: '$extra',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  symbol: {
    marginRight: '4rem',
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  price: {
    color: '$title',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  }
});

const popularStyles = EStyleSheet.create({
  list: {
    paddingHorizontal: '8rem'
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '8rem'
  },
  name: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  price: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  product: { products }
}) => ({
  appTheme: theme,
  products
});

export default compose(
  withNavigation,
  connect(mapStateToProps)
)(Products);

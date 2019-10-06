import React, { Component } from 'react';
import { Animated, Dimensions, Easing, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getSaleProduct } from '../../controllers/product/actions';
import ThemeButton from '../../components/theme/Button';

const Color = require('color');

const drawerHeight = 248;

class SaleProduct extends Component {
  state = {
    drawed: false
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getSaleProduct(id);
  }

  onDrawed = () => {
    if (this.state.drawed) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => {
        this.setState({ drawed: false });
      });
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => {
        this.setState({ drawed: true });
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fullfill}>
          {this.props.images && (
            <Swiper
              dotColor={Color(this.props.customTheme.container).alpha(0.3).string()}
              dotStyle={styles.pageDot}
              activeDotColor={this.props.customTheme.container}
              activeDotStyle={styles.pageDot}
              paginationStyle={styles.pagination}
            >
              {this.props.images.map((image, index) => (
                <View key={index}>
                  <Image resizeMode="cover" style={styles.fullfill} source={{ uri: image }} />
                </View>
              ))}
            </Swiper>
          )}
        </View>
        <Animated.View style={{
          width: '100%',
          height: verticalScale(drawerHeight),
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-verticalScale(40), -verticalScale(drawerHeight)]
            })
          }]
        }}>
          <View style={{
            ...styles.panel,
            backgroundColor: this.props.customTheme.container
          }}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={{ ...styles.drawer, backgroundColor: this.props.customTheme.drawer }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                ...productStyles.name,
                color: this.props.customTheme.title
              }}>{this.props.name}</Text>
              <Text style={{
                ...productStyles.extra,
                color: this.props.customTheme.extra,
                backgroundColor: this.props.customTheme.palette.warning
              }}>{this.props.extra}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{
                  ...productStyles.symbol,
                  color: this.props.customTheme.title
                }}>$</Text>
                <Text style={{
                  ...productStyles.price,
                  color: this.props.customTheme.title
                }}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={{
              ...productStyles.overview,
              color: this.props.customTheme.label
            }}>{this.props.overview}</Text>
            <View style={actionStyles.container}>
              <Button
                buttonStyle={{
                  ...actionStyles.close,
                  backgroundColor: this.props.customTheme.palette.grey3
                }}
                icon={{
                  name: 'close',
                  type: 'material',
                  size: verticalScale(24),
                  color: this.props.customTheme.palette.grey0
                }}
                TouchableComponent={TouchableOpacity}
                onPress={() => this.props.navigation.pop()}
              />
              <ThemeButton
                containerStyle={{ flex: 1 }}
                buttonStyle={actionStyles.buy}
                title="Buy"
                titleStyle={actionStyles.buttonTitle}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  fullfill: {
    width: '100%',
    height: '100%'
  },
  pageDot: {
    width: '7@vs',
    height: '7@vs',
    borderRadius: '3.5@vs'
  },
  pagination: {
    bottom: '50@vs'
  },
  panel: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '40@vs',
    borderTopRightRadius: '40@vs',
    paddingHorizontal: '24@vs',
    paddingBottom: '16@vs'
  },
  drawerWrapper: {
    width: '100%',
    padding: '16@vs',
    alignItems: 'center'
  },
  drawer: {
    width: '32@vs',
    height: '5@vs',
    borderRadius: '2.5@vs'
  }
});

const productStyles = ScaledSheet.create({
  name: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  },
  extra: {
    marginLeft: '12@vs',
    borderRadius: '4@vs',
    paddingHorizontal: '4@vs',
    paddingVertical: '2@vs',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: Math.floor(verticalScale(24) * 0.6),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: '4@vs',
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  overview: {
    marginTop: '16@vs',
    marginBottom: '24@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  }
});

const actionStyles = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '14@vs'
  },
  close: {
    width: '64@vs',
    height: '64@vs',
    borderRadius: '12@vs',
    marginRight: '8@vs'
  },
  buy: {
    height: '64@vs',
    borderRadius: '12@vs'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  product: { saleProduct }
}) => ({
  customTheme: theme,
  ...saleProduct
});

const mapDispatchToProps = (dispacth) => ({
  getSaleProduct: (id) => dispacth(getSaleProduct(id))
});

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(SaleProduct);

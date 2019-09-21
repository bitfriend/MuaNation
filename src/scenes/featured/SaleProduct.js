import React, { Component } from 'react';
import { Animated, Dimensions, Easing, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import colors from '../../components/theme/colors';
import { getSaleProduct } from '../../controllers/product/actions';

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
            <Swiper paginationStyle={styles.pagination}>
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
          height: drawerHeight,
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, -drawerHeight]
            })
          }]
        }}>
          <View style={styles.panel}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={styles.drawer} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={productStyles.name}>{this.props.name}</Text>
              <Text style={productStyles.extra}>{this.props.extra}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={productStyles.dollar}>$</Text>
                <Text style={productStyles.price}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={productStyles.overview}>{this.props.overview}</Text>
            <View style={actionStyles.container}>
              <Button
                buttonStyle={actionStyles.close}
                icon={{
                  name: 'close',
                  type: 'material',
                  size: 20,
                  color: colors.taupe
                }}
                TouchableComponent={TouchableOpacity}
                onPress={() => this.props.navigation.pop()}
              />
              <Button
                containerStyle={{ flex: 1 }}
                buttonStyle={actionStyles.buy}
                title="Buy"
                titleStyle={{
                  fontFamily: 'Roboto',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
                TouchableComponent={TouchableOpacity}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullfill: {
    width: '100%',
    height: '100%'
  },
  pagination: {
    bottom: 50
  },
  panel: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'white'
  },
  drawerWrapper: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  drawer: {
    backgroundColor: colors.lightGray,
    width: 64,
    height: 5,
    borderRadius: 2.5
  }
});

const productStyles = StyleSheet.create({
  name: {
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold'
  },
  extra: {
    marginLeft: 8,
    backgroundColor: colors.pastelOrange,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: colors.taupe,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  dollar: {
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: Math.floor(24 * 0.6),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: 4,
    color: colors.smokyBlack,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  },
  overview: {
    color: colors.taupe,
    fontFamily: 'Roboto',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24
  }
});

const actionStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 14
  },
  close: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.isabelline,
    marginRight: 8
  },
  buy: {
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.mulberry,
    ...Platform.select({
      ios: {
        shadowRadius: 16,
        shadowColor: colors.sealBrown,
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 6 }
      },
      android: {
        elevation: 6
      }
    })
  }
});

const mapStateToProps = ({
  product: { saleProduct }
}) => ({
  ...saleProduct
});

const mapDispatchToProps = (dispacth) => ({
  getSaleProduct: (id) => dispacth(getSaleProduct(id))
});

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(SaleProduct);

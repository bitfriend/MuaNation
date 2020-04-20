import React, { PureComponent } from 'react';
import { Animated, Easing, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import CubeNavigation from '../../component/CubeNavigation';
import { getSaleProduct } from '../../controller/product/actions';
import ThemeButton from '../../component/theme/Button';

const drawerHeight = EStyleSheet.value('248rem');

class SaleProduct extends PureComponent {
  state = {
    drawed: false
  }

  animatedValue = new Animated.Value(0)

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getSaleProduct(id);
  }

  onDrawed = () => Animated.timing(this.animatedValue, {
    toValue: this.state.drawed ? 0 : 1,
    duration: 500,
    easing: Easing.ease,
    useNativeDriver: true
  }).start(() => this.setState({ drawed: !this.state.drawed }))

  render = () => (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: '100%' }}>
        {this.props.images && (
          <CubeNavigation>
            {this.props.images.map((item, index) => (
              <Image key={index} resizeMode="cover" style={{ width: '100%', height: '100%' }} source={{ uri: item }} />
            ))}
          </CubeNavigation>
        )}
      </View>
      <Animated.View style={{
        width: '100%',
        height: drawerHeight,
        transform: [{
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-EStyleSheet.value('40rem'), -drawerHeight]
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
              <Text style={productStyles.symbol}>$</Text>
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
                size: EStyleSheet.value('24rem'),
                color: EStyleSheet.value('$grey0Color')
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
  )
}

const styles = EStyleSheet.create({
  panel: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '40rem',
    borderTopRightRadius: '40rem',
    paddingHorizontal: '24rem',
    paddingBottom: '16rem',
    backgroundColor: '$container'
  },
  drawerWrapper: {
    width: '100%',
    padding: '16rem',
    alignItems: 'center'
  },
  drawer: {
    width: '32rem',
    height: '5rem',
    borderRadius: '2.5rem',
    backgroundColor: '$drawer'
  }
});

const productStyles = EStyleSheet.create({
  name: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  },
  extra: {
    marginLeft: '12rem',
    borderRadius: '4rem',
    paddingHorizontal: '4rem',
    paddingVertical: '2rem',
    backgroundColor: '$warningColor',
    color: '$extra',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  symbol: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '24rem * 0.6',
    fontWeight: 'bold'
  },
  price: {
    marginLeft: '4rem',
    color: '$title',
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  overview: {
    marginTop: '16rem',
    marginBottom: '24rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '18rem'
  }
});

const actionStyles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '14rem'
  },
  close: {
    width: '64rem',
    height: '64rem',
    borderRadius: '12rem',
    marginRight: '8rem',
    backgroundColor: '$grey3Color'
  },
  buy: {
    height: '64rem',
    borderRadius: '12rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
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

import React, { Component } from 'react';
import { Animated, Dimensions, Easing, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import FloatingBackButton from '../../components/FloatingBackButton';
import styles from './styles';
import { getProductDetails } from '../../controllers/product/actions';
import { getFullName } from '../../util';

class ProductDetails extends Component {
  state = {
    drawed: false
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getProductDetails(id);
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

  renderScore(score, size, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={size} color={score > criterion ? '#fabc3c' : '#dcd7d9'} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  renderCard() {
    if (!this.props.productDetails.artist)
      return null;
    const { avatar, score, overview } = this.props.productDetails.artist;
    return (
      <View style={cardStyles.container}>
        <Image source={{ uri: avatar }} style={cardStyles.avatar} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={cardStyles.name}>{getFullName(this.props.productDetails.artist)}</Text>
            {this.renderScore(score, 16, 2)}
          </View>
          <Text style={cardStyles.overview}>{overview}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { images, name, price, overview, artist } = this.props.productDetails;
    const { height: windowHeight } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <FloatingBackButton />
        <View style={customStyles.fullfill}>
          {images && (
            <Swiper paginationStyle={customStyles.pagination}>
              {images.map((image, index) => (
                <View key={index}>
                  <Image resizeMode="cover" style={customStyles.fullfill} source={{ uri: image }} />
                </View>
              ))}
            </Swiper>
          )}
        </View>
        <Animated.View style={{
          width: '100%',
          height: windowHeight * 0.5,
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, -windowHeight * 0.5]
            })
          }]
        }}>
          <View style={customStyles.panel}>
            <TouchableOpacity style={customStyles.drawerWrapper} onPress={this.onDrawed}>
              <View style={customStyles.drawer} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={productStyles.name}>{name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={productStyles.dollar}>$</Text>
                <Text style={productStyles.price}>{price}</Text>
              </View>
            </View>
            <ScrollView>
              <Text style={productStyles.overview}>{overview}</Text>
              {this.renderCard()}
              <View style={actionStyles.container}>
                <Button
                  buttonStyle={actionStyles.close}
                  icon={{
                    name: 'close',
                    type: 'material',
                    size: 20,
                    color: '#97898e'
                  }}
                  TouchableComponent={TouchableOpacity}
                />
                <Button
                  containerStyle={{ flex: 1 }}
                  buttonStyle={actionStyles.book}
                  icon={{
                    name: 'date-range',
                    type: 'material',
                    size: 20,
                    color: 'white'
                  }}
                  title="Book"
                  titleStyle={{
                    fontFamily: 'Roboto',
                    fontSize: 18,
                    fontWeight: 'bold'
                  }}
                  TouchableComponent={TouchableOpacity}
                />
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'white'
  },
  drawerWrapper: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  drawer: {
    backgroundColor: '#dcd7d9',
    width: 64,
    height: 5,
    borderRadius: 2.5
  }
});

const productStyles = StyleSheet.create({
  name: {
    flex: 1,
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dollar: {
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: Math.floor(24 * 0.6)
  },
  price: {
    color: '#17050b',
    fontFamily: 'Lato',
    fontSize: 24
  },
  overview: {
    color: '#513a42',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24
  }
});

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
    flex: 1,
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: '100%',
    color: '#513a42',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 8
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
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 8
  },
  book: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#ef3475'
  }
});

const mapStateToProps = ({
  product: { productDetails }
}) => ({
  productDetails
});

const mapDispatchToProps = (dispacth) => ({
  getProductDetails: (id) => dispacth(getProductDetails(id))
});

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductDetails);
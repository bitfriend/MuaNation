import React, { Component, PureComponent } from 'react';
import { Animated, Dimensions, Easing, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import colors from '../../components/theme/colors';
import { getPopularProduct } from '../../controllers/product/actions';

const drawerHeight = 402;

class PopularProduct extends Component {
  state = {
    drawed: false
  };

  animatedValue = new Animated.Value(0);

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getPopularProduct(id);
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
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 }}>
              <Text style={productStyles.name}>{this.props.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={productStyles.dollar}>$</Text>
                <Text style={productStyles.price}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <ScrollView>
              <Text style={productStyles.overview}>{this.props.overview}</Text>
            </ScrollView>
            <View style={{ height: 96 }}>
              <FlatList
                data={this.props.artists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index, separators }) => (
                  <View style={styles.listItem}>
                    <SaleProduct {...item} />
                  </View>
                )}
                horizontal
              />
            </View>
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
          </View>
        </Animated.View>
      </View>
    );
  }
}

class SaleProduct extends PureComponent {
  renderScore(score, size, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={size} color={score > criterion ? colors.pastelOrange : colors.lightGray} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={cardStyles.container}>
        <Image source={{ uri: this.props.avatar }} style={cardStyles.avatar} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={cardStyles.name}>{this.props.fullName}</Text>
            {this.renderScore(score, 16, 2)}
          </View>
          <Text style={cardStyles.comment}>{this.props.comment}</Text>
        </View>
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
    flex: 1,
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: 18,
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
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24
  }
});

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.isabelline,
    borderRadius: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
    flex: 1,
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  comment: {
    width: '100%',
    color: colors.taupe,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 8
  }
});

const actionStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 14,
    paddingHorizontal: 24
  },
  close: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.isabelline,
    marginRight: 8
  },
  book: {
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
  product: { popularProduct }
}) => ({
  ...popularProduct
});

const mapDispatchToProps = (dispacth) => ({
  getPopularProduct: (id) => dispacth(getPopularProduct(id))
});

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(PopularProduct);

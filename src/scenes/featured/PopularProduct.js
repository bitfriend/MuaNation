import React, { Component } from 'react';
import { Animated, Dimensions, Easing, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getPopularProduct } from '../../controllers/product/actions';

const Color = require('color');

const drawerHeight = 402;
const { width: windowWidth } = Dimensions.get('window');
const criteria = [0, 1, 2, 3, 4];

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

  renderScore(score, size, marginHorizontal) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={size}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal }}
          />
        ))}
      </View>
    );
  }

  renderCard = ({ item, index, separators }) => {
    return (
      <View style={{
        ...cardStyles.container,
        backgroundColor: this.props.customTheme.palette.grey3
      }}>
        <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={{
              ...cardStyles.name,
              color: this.props.customTheme.title
            }}>{item.fullName}</Text>
            {this.renderScore(item.score, 16, 2)}
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{
            ...cardStyles.comment,
            color: this.props.customTheme.label
          }}>{item.comment}</Text>
        </View>
      </View>
    );
  }

  render() {
    console.log('artists', this.props.artists);
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
          height: drawerHeight,
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-40, -drawerHeight]
            })
          }]
        }}>
          <View style={{
            ...styles.panel,
            backgroundColor: this.props.customTheme.container
          }}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={{
                ...styles.drawer,
                backgroundColor: this.props.customTheme.palette.grey2
              }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 }}>
              <Text style={{
                ...styles.name,
                color: this.props.customTheme.title
              }}>{this.props.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  ...styles.dollar,
                  color: this.props.customTheme.title
                }}>$</Text>
                <Text style={{
                  ...styles.price,
                  color: this.props.customTheme.title
                }}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <ScrollView style={{ marginTop: 16, marginBottom: 24, marginHorizontal: 24 }}>
              <Text style={{
                ...styles.overview,
                color: this.props.customTheme.label
              }}>{this.props.overview}</Text>
            </ScrollView>
            {this.props.reviews && (
              <View style={{ height: 96 }}>
                <FlatList
                  data={this.props.reviews}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderCard}
                  ListHeaderComponent={() => <View style={{ width: 24 }} />}
                  ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                  ListFooterComponent={() => <View style={{ width: 24 }} />}
                  horizontal
                />
              </View>
            )}
            <View style={actionStyles.container}>
              <Button
                buttonStyle={{
                  ...actionStyles.close,
                  backgroundColor: this.props.customTheme.palette.grey3
                }}
                icon={{
                  name: 'close',
                  type: 'material',
                  size: 20,
                  color: this.props.customTheme.palette.grey0
                }}
                TouchableComponent={TouchableOpacity}
                onPress={() => this.props.navigation.pop()}
              />
              <Button
                containerStyle={{ flex: 1 }}
                buttonStyle={{
                  ...actionStyles.book,
                  backgroundColor: this.props.customTheme.palette.secondary,
                  ...this.props.customTheme.buttonShadow
                }}
                icon={{
                  name: 'date-range',
                  type: 'material',
                  size: 20,
                  color: this.props.customTheme.buttonTitle
                }}
                title="Book"
                titleStyle={{
                  color: this.props.customTheme.buttonTitle,
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
    paddingBottom: 16
  },
  drawerWrapper: {
    width: '100%',
    padding: 16,
    alignItems: 'center'
  },
  drawer: {
    width: 64,
    height: 5,
    borderRadius: 2.5
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dollar: {
    fontFamily: 'Roboto',
    fontSize: Math.floor(24 * 0.6),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: 4,
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  },
  overview: {
    fontFamily: 'Roboto',
    fontSize: 18
  }
});

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  comment: {
    width: windowWidth * 0.6,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginTop: 4
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
    marginRight: 8
  },
  book: {
    height: 64,
    borderRadius: 12
  }
});

const mapStateToProps = ({
  common: { theme },
  product: { popularProduct }
}) => ({
  customTheme: theme,
  ...popularProduct
});

const mapDispatchToProps = (dispacth) => ({
  getPopularProduct: (id) => dispacth(getPopularProduct(id))
});

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(PopularProduct);

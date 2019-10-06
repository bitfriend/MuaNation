import React, { Component } from 'react';
import { Animated, Dimensions, Easing, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getPopularProduct } from '../../controllers/product/actions';
import ThemeButton from '../../components/theme/Button';

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

  renderScore(score, size, spacing) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={verticalScale(size)}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal: verticalScale(spacing) }}
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
        <View style={cardStyles.body}>
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
          height: verticalScale(drawerHeight),
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-verticalScale(40), -verticalScale(drawerHeight)]
            })
          }]
        }}>
          <View style={{ ...styles.panel, backgroundColor: this.props.customTheme.container }}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={{ ...styles.drawer, backgroundColor: this.props.customTheme.drawer }} />
            </TouchableOpacity>
            <View style={styles.body}>
              <Text style={{
                ...styles.name,
                color: this.props.customTheme.title
              }}>{this.props.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  ...styles.symbol,
                  color: this.props.customTheme.title
                }}>$</Text>
                <Text style={{
                  ...styles.price,
                  color: this.props.customTheme.title
                }}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <ScrollView style={styles.overviewWrapper}>
              <Text style={{
                ...styles.overview,
                color: this.props.customTheme.label
              }}>{this.props.overview}</Text>
            </ScrollView>
            {this.props.reviews && (
              <View style={listStyles.container}>
                <FlatList
                  data={this.props.reviews}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderCard}
                  ListHeaderComponent={() => <View style={listStyles.header} />}
                  ListFooterComponent={() => <View style={listStyles.footer} />}
                  ItemSeparatorComponent={() => <View style={listStyles.separator} />}
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
                  size: verticalScale(24),
                  color: this.props.customTheme.palette.grey0
                }}
                TouchableComponent={TouchableOpacity}
                onPress={() => this.props.navigation.pop()}
              />
              <ThemeButton
                containerStyle={{ flex: 1 }}
                buttonStyle={actionStyles.book}
                icon={{
                  name: 'date-range',
                  type: 'material',
                  size: verticalScale(20)
                }}
                title="Book"
                titleStyle={actionStyles.buttonTitle}
                onPress={() => this.props.navigation.navigate('Booking')}
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
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '24@vs'
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: verticalScale(Math.floor(24 * 0.6)),
    fontWeight: 'bold'
  },
  price: {
    marginLeft: '4@vs',
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  overviewWrapper: {
    marginTop: '16@vs',
    marginBottom: '24@vs',
    marginHorizontal: '24@vs'
  },
  overview: {
    fontFamily: 'Roboto',
    fontSize: '18@vs'
  }
});

const cardStyles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    padding: '16@vs',
    borderRadius: '12@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  body: {
    flex: 1,
    paddingLeft: '16@vs'
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  comment: {
    width: windowWidth * 0.6,
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    marginTop: '4@vs'
  }
});

const listStyles = ScaledSheet.create({
  container: {
    height: '96@vs'
  },
  header: {
    width: '24@vs'
  },
  footer: {
    width: '24@vs'
  },
  separator: {
    width: '8@vs'
  }
});

const actionStyles = ScaledSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '14@vs',
    paddingHorizontal: '24@vs'
  },
  close: {
    width: '64@vs',
    height: '64@vs',
    borderRadius: '12@vs',
    marginRight: '8@vs'
  },
  book: {
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

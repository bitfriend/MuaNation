import React, { Component } from 'react';
import { Animated, Easing, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getPopularProduct } from '../../controller/product/actions';
import ThemeButton from '../../component/theme/Button';

const Color = require('color');

const drawerHeight = 402;

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

  renderScore(score) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={EStyleSheet.value('16rem')}
            color={EStyleSheet.value(score > criterion ? '$fullStar' : '$emptyStar')}
            containerStyle={cardStyles.star}
          />
        ))}
      </View>
    );
  }

  renderCard = ({ item, index, separators }) => {
    return (
      <View style={cardStyles.container}>
        <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
        <View style={cardStyles.body}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={cardStyles.name}>{item.fullName}</Text>
            {this.renderScore(item.score)}
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail" style={cardStyles.comment}>{item.comment}</Text>
        </View>
      </View>
    );
  }

  render() {
    console.log('artists', this.props.artists);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: '100%' }}>
          {this.props.images && (
            <Swiper
              dotColor={Color(EStyleSheet.value('$container')).alpha(0.3).string()}
              dotStyle={styles.pageDot}
              activeDotColor={EStyleSheet.value('$container')}
              activeDotStyle={styles.pageDot}
              paginationStyle={styles.pagination}
            >
              {this.props.images.map((image, index) => (
                <View key={index}>
                  <Image resizeMode="cover" style={{ width: '100%', height: '100%' }} source={{ uri: image }} />
                </View>
              ))}
            </Swiper>
          )}
        </View>
        <Animated.View style={{
          width: '100%',
          height: EStyleSheet.value(drawerHeight + 'rem'),
          transform: [{
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-EStyleSheet.value('40rem'), -EStyleSheet.value(drawerHeight + 'rem')]
            })
          }]
        }}>
          <View style={styles.panel}>
            <TouchableOpacity style={styles.drawerWrapper} onPress={this.onDrawed}>
              <View style={styles.drawer} />
            </TouchableOpacity>
            <View style={styles.body}>
              <Text style={styles.name}>{this.props.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.symbol}>$</Text>
                <Text style={styles.price}>{this.props.price && this.props.price.toFixed(2)}</Text>
              </View>
            </View>
            <ScrollView style={styles.overviewWrapper}>
              <Text style={styles.overview}>{this.props.overview}</Text>
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
                buttonStyle={actionStyles.book}
                icon={{
                  name: 'date-range',
                  type: 'material',
                  size: EStyleSheet.value('20rem')
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

const styles = EStyleSheet.create({
  pageDot: {
    width: '7rem',
    height: '7rem',
    borderRadius: '3.5rem'
  },
  pagination: {
    bottom: '50rem'
  },
  panel: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '40rem',
    borderTopRightRadius: '40rem',
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
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '24rem'
  },
  name: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
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
  overviewWrapper: {
    marginTop: '16rem',
    marginBottom: '24rem',
    marginHorizontal: '24rem'
  },
  overview: {
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '18rem'
  }
});

const cardStyles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: '16rem',
    borderRadius: '12rem',
    backgroundColor: '$grey3Color'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  body: {
    flex: 1,
    paddingLeft: '16rem'
  },
  name: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  star: {
    marginHorizontal: '2rem'
  },
  comment: {
    width: '60%',
    marginTop: '4rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const listStyles = EStyleSheet.create({
  container: {
    height: '96rem'
  },
  header: {
    width: '24rem'
  },
  footer: {
    width: '24rem'
  },
  separator: {
    width: '8rem'
  }
});

const actionStyles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '14rem',
    paddingHorizontal: '24rem'
  },
  close: {
    width: '64rem',
    height: '64rem',
    borderRadius: '12rem',
    marginRight: '8rem',
    backgroundColor: '$grey3Color'
  },
  book: {
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

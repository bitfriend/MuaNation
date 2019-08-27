import React, { Component, Fragment, PureComponent } from 'react';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import { connect } from 'react-redux';

import Carousel from '../../components/carousel';
import styles from './styles';
import { getFullName } from '../../libs/util';

class Artists extends Component {
  onPressCard = () => {
    this.props.navigation.navigate('ArtistProfile');
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    let images = [];
    this.props.artists.map((artist) => images.push(artist.avatar));

    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 24, justifyContent: 'center' }}>
          <ImageCacheProvider urlsToPreload={images}>
            <Carousel
              data={this.props.artists}
              renderItem={({ item, index, animatedValue }) => (
                <TouchableOpacity activeOpacity={1} onPress={this.onPressCard}>
                  <Artist {...item} animatedValue={animatedValue} />
                </TouchableOpacity>
              )}
              sliderWidth={windowWidth}
              itemWidth={windowWidth * 0.7}
              slideInterpolatedStyle={this.getAnimatedStyle}
              contentContainerCustomStyle={{ alignItems: 'center' }}
            />
          </ImageCacheProvider>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ImageCacheProvider urlsToPreload={images}>
            <FlatList
              data={this.props.artists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity>
                  <Product {...item} />
                </TouchableOpacity>
              )}
            />
          </ImageCacheProvider>
        </View>
      </View>
    );
  }
}

class Artist extends PureComponent {
  renderScore(score, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <Fragment>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={16} color={score > criterion ? '#fabc3c' : '#dcd7d9'} containerStyle={{ marginHorizontal }} />
        ))}
      </Fragment>
    );
  }

  render() {
    const { avatar, checked, tags, score, reviews, products, animatedValue } = this.props;

    return (
      <View style={{ width: 252, height: 189 }}>
        <Animated.View style={[customStyles.cardOuter, {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]} />
        <View style={customStyles.cardInner}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, marginBottom: 8 }}>
              <CachedImage source={{ uri: avatar }} style={customStyles.avatar} />
            </View>
            {checked && (
              <Icon type="font-awesome" name="check-circle" size={24} color="#ef3475" />
            )}
          </View>
          <Text style={customStyles.cardName}>{getFullName(this.props)}</Text>
          <View style={{ flexDirection: 'row', overflow: 'hidden', marginHorizontal: -2, marginTop: 8, marginBottom: 16 }}>
            {tags.map((tag, subIndex) => (
              <Text key={subIndex} style={customStyles.tag}>{tag}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            {this.renderScore(score, 2)}
            <Text style={{ color: '#97898e', fontSize: 10, marginLeft: 4 }}>{reviews} reviews</Text>
          </View>
        </View>
      </View>
    );
  }
}

class Product extends PureComponent {
  render() {
    return (
      <View style={customStyles.listItem}>
        <CachedImage source={{ uri: this.props.avatar }} style={customStyles.avatar} />
        <Text style={customStyles.listName}>{getFullName(this.props)}</Text>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  cardOuter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: '#ef3475',
    borderWidth: 2,
    borderRadius: 14
  },
  cardInner: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  },
  cardName: {
    color: '#17050b',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tag: {
    color: '#97898e',
    backgroundColor: '#f6f5f5',
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    textTransform: 'capitalize'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#dcd7d9',
    borderBottomWidth: 1
  },
  listName: {
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    textTransform: 'capitalize'
  }
});

const mapStateToProps = ({
  artist: { artists }
}) => ({
  artists
});

export default connect(mapStateToProps)(Artists);

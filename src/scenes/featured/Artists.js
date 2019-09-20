import React, { Component, Fragment, PureComponent } from 'react';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import Carousel from '../../components/carousel';
import colors from '../../components/theme/colors';
import { getFeaturedArtists, getArtists } from '../../controllers/artist/actions';

class Artists extends Component {
  componentDidMount() {
    this.props.getFeaturedArtists(error => {
      Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
    });
    this.props.getArtists(error => {
      Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
    });
  }

  onPressCard = () => {
    this.props.navigation.navigate('ArtistProfile');
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    let featuredImages = [];
    this.props.featuredArtists.map((artist) => featuredImages.push(artist.avatar));

    let images = [];
    this.props.artists.map((artist) => images.push(artist.avatar));

    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 24, justifyContent: 'center' }}>
          <ImageCacheProvider urlsToPreload={featuredImages}>
            <Carousel
              data={this.props.featuredArtists}
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
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: colors.isabelline }} />
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
    const { avatar, fullName, checked, tags, score, reviews, animatedValue } = this.props;

    return (
      <View style={{ width: 252, height: 189 }}>
        <Animated.View style={[styles.cardOuter, {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]} />
        <View style={styles.cardInner}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, marginBottom: 8 }}>
              {!avatar ? (
                <Image source={require('../../../asset/images/male.png')} style={styles.avatar} />
              ) : (
                <CachedImage source={{ uri: avatar }} style={styles.avatar} />
              )}
            </View>
            {checked && (
              <Icon type="font-awesome" name="check-circle" size={24} color="#ef3475" />
            )}
          </View>
          <Text style={styles.cardName}>{fullName}</Text>
          <View style={{ flexDirection: 'row', overflow: 'hidden', marginHorizontal: -2, marginTop: 8, marginBottom: 16 }}>
            {tags.map((tag, subIndex) => (
              <Text key={subIndex} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            {this.renderScore(score, 2)}
            <Text style={styles.review}>{reviews} reviews</Text>
          </View>
        </View>
      </View>
    );
  }
}

class Product extends PureComponent {
  render() {
    return (
      <View style={styles.listItem}>
        <CachedImage source={{ uri: this.props.avatar }} style={styles.avatar} />
        <Text style={styles.listName}>{this.props.fullName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.isabelline
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  cardOuter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: colors.isabelline,
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
    color: colors.smokyBlack,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tag: {
    color: colors.taupeGray,
    backgroundColor: colors.isabelline,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    textTransform: 'capitalize'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  listName: {
    color: colors.smokyBlack,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    textTransform: 'capitalize'
  },
  review: {
    color: colors.taupeGray,
    fontSize: 10,
    marginLeft: 4
  }
});

const mapStateToProps = ({
  artist: { featuredArtists, artists }
}) => ({
  featuredArtists, artists
});

const mapDispatchToProps = (dispacth) => ({
  getFeaturedArtists: (onError) => dispacth(getFeaturedArtists(onError)),
  getArtists: (onError) => dispacth(getArtists(onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);

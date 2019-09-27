import React, { Component, Fragment } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

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

  renderScore(score, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <Fragment>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={16}
            color={score > criterion ? this.props.customTheme.palette.warning : this.props.customTheme.label}
            containerStyle={{ marginHorizontal }}
          />
        ))}
      </Fragment>
    );
  }

  renderCard = ({ item, index, separators }) => {
    return (
      <View style={{ paddingHorizontal: 8, marginVertical: 24 }}>
        <TouchableOpacity onPress={this.onPressCard}>
          <View style={{
            ...styles.card,
            backgroundColor: this.props.customTheme.card,
            ...this.props.customTheme.shadows[3]
          }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flex: 1, marginBottom: 8 }}>
                {!item.avatar ? (
                  <Image source={require('../../../asset/images/male.png')} style={styles.avatar} />
                ) : (
                  <CachedImage source={{ uri: item.avatar }} style={styles.avatar} />
                )}
              </View>
            </View>
            <Text style={{
              ...styles.cardName,
              color: this.props.customTheme.title
            }}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', overflow: 'hidden', marginHorizontal: -2, marginTop: 8, marginBottom: 16 }}>
              {item.tags.map((tag, subIndex) => (
                <Text key={subIndex} style={{
                  ...styles.tag,
                  color: this.props.customTheme.tagTitle,
                  backgroundColor: this.props.customTheme.tag
                }}>{tag}</Text>
              ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              {this.renderScore(item.score, 2)}
              <Text style={{
                ...styles.reviews,
                color: this.props.customTheme.label
              }}>{item.reviews} reviews</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={{
        ...styles.listItem,
        backgroundColor: this.props.customTheme.container
      }}>
        <CachedImage source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={{
          ...styles.listName,
          color: this.props.customTheme.title
        }}>{item.fullName}</Text>
      </View>
    );
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    let featuredImages = [];
    this.props.featuredArtists.map((artist) => featuredImages.push(artist.avatar));

    let images = [];
    this.props.artists.map((artist) => images.push(artist.avatar));

    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <View style={{ height: 240 }}>
          <ImageCacheProvider urlsToPreload={featuredImages}>
            <FlatList
              data={this.props.featuredArtists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderCard}
              horizontal
              ListHeaderComponent={() => <View style={{ width: 8 }} />}
              ListFooterComponent={() => <View style={{ width: 8 }} />}
            />
          </ImageCacheProvider>
        </View>
        <View style={{ flex: 1 }}>
          <ImageCacheProvider urlsToPreload={images}>
            <FlatList
              data={this.props.artists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: this.props.customTheme.palette.grey3 }} />
              )}
            />
          </ImageCacheProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  card: {
    width: 254,
    height: 192,
    borderRadius: 12,
    padding: 24
  },
  cardName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    borderRadius: 4,
    fontSize: 14,
    textTransform: 'capitalize'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  listName: {
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  reviews: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { featuredArtists, artists }
}) => ({
  customTheme: theme,
  featuredArtists, artists
});

const mapDispatchToProps = (dispacth) => ({
  getFeaturedArtists: (onError) => dispacth(getFeaturedArtists(onError)),
  getArtists: (onError) => dispacth(getArtists(onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);

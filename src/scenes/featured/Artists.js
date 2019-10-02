import React, { Component, Fragment } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import { getFeaturedArtists, getArtists } from '../../controllers/artist/actions';

const criteria = [0, 1, 2, 3, 4];

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
    this.props.navigation.navigate('Artist');
  }

  renderScore(score, marginHorizontal) {
    return (
      <Fragment>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={verticalScale(16)}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal }}
          />
        ))}
      </Fragment>
    );
  }

  renderCard = ({ item, index, separators }) => {
    return (
      <View style={{ paddingHorizontal: verticalScale(8), marginVertical: verticalScale(24) }}>
        <TouchableOpacity onPress={this.onPressCard} style={{
          ...styles.card,
          backgroundColor: this.props.customTheme.card,
          ...this.props.customTheme.shadows[3]
        }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, marginBottom: verticalScale(8) }}>
              {!item.avatar ? (
                <Image source={require('../../../asset/images/male.png')} style={styles.avatar} />
              ) : (
                <FastImage
                  style={styles.avatar}
                  source={{ uri: item.avatar }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
            </View>
          </View>
          <Text style={{
            ...styles.cardName,
            color: this.props.customTheme.title
          }}>{item.fullName}</Text>
          <View style={{ flexDirection: 'row', overflow: 'hidden', marginTop: verticalScale(8), marginBottom: verticalScale(16) }}>
            {item.tags.map((tag, subIndex) => (
              <Text key={subIndex} style={{
                ...styles.tag,
                marginRight: subIndex < item.tags.length - 1 ? verticalScale(4) : 0,
                color: this.props.customTheme.tagTitle,
                backgroundColor: this.props.customTheme.tag
              }}>{tag}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(16) }}>
            {this.renderScore(item.score, verticalScale(2))}
            <Text style={{
              ...styles.reviews,
              color: this.props.customTheme.label
            }}>{item.reviews} reviews</Text>
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
        <FastImage
          style={styles.avatar}
          source={{ uri: item.avatar }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={{
          ...styles.listName,
          color: this.props.customTheme.title
        }}>{item.fullName}</Text>
      </View>
    );
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <View style={{ height: verticalScale(240) }}>
          <FlatList
            data={this.props.featuredArtists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderCard}
            horizontal
            ListHeaderComponent={() => <View style={{ width: verticalScale(8) }} />}
            ListFooterComponent={() => <View style={{ width: verticalScale(8) }} />}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.artists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => (
              <View style={{ height: verticalScale(StyleSheet.hairlineWidth), backgroundColor: this.props.customTheme.palette.grey3 }} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  card: {
    width: '254@vs',
    height: '192@vs',
    borderRadius: '12@vs',
    padding: '24@vs'
  },
  cardName: {
    fontSize: '16@vs',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tag: {
    paddingHorizontal: '4@vs',
    paddingVertical: '2@vs',
    borderRadius: '4@vs',
    fontSize: '14@vs',
    textTransform: 'capitalize'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16@vs'
  },
  listName: {
    marginLeft: '16@vs',
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  reviews: {
    marginLeft: '4@vs',
    fontSize: '10@vs',
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

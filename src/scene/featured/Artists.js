import React, { PureComponent, Fragment } from 'react';
import { Image, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import { getFeaturedArtists, getArtists } from '../../controller/artist/actions';

const criteria = [0, 1, 2, 3, 4];

class Artists extends PureComponent {
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

  render = () => (
    <View style={styles.container}>
      <View style={styles.featuredWrapper}>
        <FlatList
          data={this.props.featuredArtists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderCard}
          horizontal
          ListHeaderComponent={() => <View style={styles.listMargin} />}
          ListFooterComponent={() => <View style={styles.listMargin} />}
        />
      </View>
      <FlatList
        data={this.props.artists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </View>
  )

  renderScore = (score) => (
    <Fragment>
      {criteria.map((criterion, index) => (
        <Icon
          key={index}
          type="font-awesome"
          name="star"
          size={EStyleSheet.value('16rem')}
          color={EStyleSheet.value(score > criterion ? '$fullStar' : '$emptyStar')}
          containerStyle={styles.star}
        />
      ))}
    </Fragment>
  )

  renderCard = ({ item, index, separators }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={this.onPressCard} style={{
        ...styles.card,
        ...this.props.appTheme.styles.shadow4
      }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={styles.avatarWrapper}>
            {!item.avatar ? (
              <Image source={require('../../../asset/image/male.png')} style={styles.avatar} />
            ) : (
              <FastImage
                style={styles.avatar}
                source={{ uri: item.avatar }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </View>
        </View>
        <Text style={styles.cardName}>{item.fullName}</Text>
        <View style={styles.tagBar}>
          {item.tags.map((tag, subIndex) => (
            <Text key={subIndex} style={{
              ...styles.tag,
              marginRight: subIndex < item.tags.length - 1 ? EStyleSheet.value('4rem') : 0
            }}>{tag}</Text>
          ))}
        </View>
        <View style={styles.scoreReview}>
          {this.renderScore(item.score)}
          <Text style={styles.reviews}>{item.reviews} reviews</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  renderItem = ({ item, index, separators }) => (
    <View style={styles.listItem}>
      <FastImage style={styles.avatar} source={{ uri: item.avatar }} resizeMode={FastImage.resizeMode.cover} />
      <Text style={styles.listName}>{item.fullName}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  featuredWrapper: {
    height: '240rem'
  },
  listMargin: {
    width: '8rem'
  },
  cardWrapper: {
    paddingHorizontal: '8rem',
    marginVertical: '24rem'
  },
  card: {
    width: '254rem',
    height: '192rem',
    borderRadius: '12rem',
    padding: '24rem',
    backgroundColor: '$card'
  },
  avatarWrapper: {
    flex: 1,
    marginBottom: '8rem'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  cardName: {
    color: '$title',
    fontSize: '16rem',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tagBar: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: '8rem',
    marginBottom: '16rem'
  },
  tag: {
    paddingHorizontal: '4rem',
    paddingVertical: '2rem',
    borderRadius: '4rem',
    backgroundColor: '$tag',
    color: '$tagTitle',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    textTransform: 'capitalize'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16rem',
    backgroundColor: '$container'
  },
  separator: {
    height: '1rem',
    marginHorizontal: '16rem',
    backgroundColor: '$grey3Color'
  },
  listName: {
    marginLeft: '16rem',
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  scoreReview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '16rem'
  },
  star: {
    marginHorizontal: '2rem'
  },
  reviews: {
    marginLeft: '4rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '10rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { featuredArtists, artists }
}) => ({
  appTheme: theme,
  featuredArtists, artists
});

const mapDispatchToProps = (dispacth) => ({
  getFeaturedArtists: (onError) => dispacth(getFeaturedArtists(onError)),
  getArtists: (onError) => dispacth(getArtists(onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);

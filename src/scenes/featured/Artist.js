import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import CategoryBar from '../../components/CategoryBar';
import { getArtist, getArtistProducts } from '../../controllers/artist/actions';

const Color = require('color');

const criteria = [0, 1, 2, 3, 4];

class Artist extends Component {
  componentDidMount() {
    const { width } = Dimensions.get('window');
    this.imageWidth = (width - verticalScale(16) * 3) / 2;
    this.imageHeight = Math.floor(this.imageWidth * 0.8);

    const id = this.props.navigation.getParam('id');
    this.props.getArtist(id);
    this.props.getArtistProducts(id, '');
  }

  onChangeCategory(category) {
    const id = this.props.navigation.getParam('id');
    this.props.getArtistProducts(id, category);
  }

  onRelations(category) {
    const id = this.props.navigation.getParam('id');
    const { fullName } = this.props.currentArtist;
    this.props.navigation.navigate('Relations', { id, fullName, category });
  }

  onReviews = () => {
    const id = this.props.navigation.getParam('id');
    this.props.navigation.navigate('Reviews', {
      id,
      score: this.props.currentArtist.score,
      reviews: this.props.currentArtist.reviews
    });
  }

  onPressItem(item) {
    this.props.navigation.navigate('PopularProduct');
  }

  renderSide(value, unit, category) {
    return (
      <TouchableOpacity style={sideStyles.container} onPress={() => this.onRelations(category)}>
        <Text style={{
          ...sideStyles.value,
          color: this.props.customTheme.title
        }}>{value}</Text>
        <Text style={{
          ...sideStyles.unit,
          color: this.props.customTheme.label
        }}>{unit}</Text>
      </TouchableOpacity>
    );
  }

  renderScore(score, spacing) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={verticalScale(16)}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal: verticalScale(spacing) }}
          />
        ))}
      </View>
    );
  }

  renderCard() {
    const { avatar, followers, following, score, reviews } = this.props.currentArtist;

    return (
      <View style={styles.card}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.statsWrapper}>
          <View style={styles.stats}>
            {this.renderSide(followers, 'followers', 'followers')}
            <View style={reviewStyles.container}>
              <TouchableOpacity onPress={this.onReviews}>
                {this.renderScore(score, 2)}
                <Text style={{ ...reviewStyles.text, color: this.props.customTheme.label }}>{reviews} reviews</Text>
              </TouchableOpacity>
            </View>
            {this.renderSide(following, 'following', 'following')}
          </View>
        </View>
      </View>
    );
  }

  renderButtons() {
    return (
      <View style={styles.buttonBar}>
        <ThemeButton
          title="Book"
          containerStyle={bookStyles.container}
          buttonStyle={bookStyles.button}
          titleStyle={bookStyles.title}
          onPress={() => this.props.navigation.navigate('Booking')}
        />
        <ThemeButton
          title="Follow"
          containerStyle={followStyles.container}
          buttonStyle={followStyles.button}
          titleStyle={followStyles.title}
          isPrimary={false}
        />
        <ThemeButton
          icon={{
            name: 'paper-plane',
            type: 'font-awesome',
            size: verticalScale(22)
          }}
          containerStyle={chatStyles.container}
          buttonStyle={chatStyles.button}
          isPrimary={false}
        />
      </View>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item)}>
        <View style={styles.listItem}>
          <FastImage
            style={{
              width: this.imageWidth,
              height: this.imageHeight,
              borderRadius: verticalScale(8)
            }}
            source={{ uri: item.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.caption}>
            <Text style={{
              ...styles.name,
              color: this.props.customTheme.title
            }}>{item.name}</Text>
            <Text style={{
              ...styles.price,
              color: this.props.customTheme.palette.secondary
            }}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { fullName, overview, tags, products } = this.props.currentArtist;
    let cateogories = [{ label: 'All', value: '' }];
    if (tags)
      tags.map((tag, index) => cateogories.push({ label: tag, value: tag }));

    let images = [];
    this.props.artistProducts.map((product) => images.push(product.image));

    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title={fullName} />
        {this.renderCard()}
        <Text style={{
          ...styles.overview,
          color: this.props.customTheme.palette.grey0
        }}>{overview}</Text>
        {this.renderButtons()}
        <CategoryBar
          tabs={cateogories}
          activeTabColor={this.props.customTheme.title}
          inactiveTabColor={this.props.customTheme.tagTitle}
          underlineColor={this.props.customTheme.title}
          onSelect={(value) => this.onChangeCategory(value)}
        />
        <FlatList
          data={this.props.artistProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          numColumns={2}
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  card: {
    width: '100%',
    alignItems: 'center'
  },
  avatar: {
    width: '88@vs',
    height: '88@vs',
    borderRadius: '44@vs',
    marginTop: '24@vs',
    marginBottom: '16@vs'
  },
  statsWrapper: {
    padding: '16@vs'
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '80@vs',
    paddingHorizontal: '24@vs',
    paddingVertical: '18@vs'
  },
  overview: {
    marginHorizontal: '24@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  buttonBar: {
    flexDirection: 'row',
    width: '100%',
    padding: '16@vs'
  },
  list: {
    paddingHorizontal: '8@vs'
  },
  listItem: {
    margin: '8@vs'
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '8@vs'
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold',
    flex: 1
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  }
});

const sideStyles = ScaledSheet.create({
  container: {
    alignItems: 'center'
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  },
  unit: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  }
});

const reviewStyles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: '2@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    textAlign: 'center'
  }
});

const bookStyles = ScaledSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: '48@vs',
    borderRadius: '12@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  }
});

const followStyles = ScaledSheet.create({
  container: {
    flex: 1,
    marginLeft: '4@vs'
  },
  button: {
    height: '48@vs',
    borderRadius: '12@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  }
});

const chatStyles = ScaledSheet.create({
  container: {
    marginLeft: '4@vs'
  },
  button: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { currentArtist, artistProducts }
}) => ({
  customTheme: theme,
  currentArtist, artistProducts
});

const mapDispatchToProps = (dispacth) => ({
  getArtist: (id) => dispacth(getArtist(id)),
  getArtistProducts: (id, category) => dispacth(getArtistProducts(id, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);

import React, { Component, PureComponent } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import CategoryBar from '../../components/CategoryBar';
import { getArtistProfile, getArtistProducts } from '../../controllers/artist/actions';

const Color = require('color');

const criteria = [0, 1, 2, 3, 4];

class ArtistProfile extends Component {
  componentDidMount() {
    const { width } = Dimensions.get('window');
    this.imageWidth = (width - 16 * 3) / 2;
    this.imageHeight = Math.floor(this.imageWidth * 0.8);

    const id = this.props.navigation.getParam('id');
    this.props.getArtistProfile(id);
    this.props.getArtistProducts(id, '');
  }

  onChangeCategory(category) {
    const id = this.props.navigation.getParam('id');
    this.props.getArtistProducts(id, category);
  }

  onRelations(category) {
    const id = this.props.navigation.getParam('id');
    const { fullName } = this.props.artistProfile;
    this.props.navigation.navigate('Relations', { id, fullName, category });
  }

  renderStatsEdge(value, unit, category) {
    return (
      <TouchableOpacity style={{ alignItems: 'center', margin: 16 }} onPress={() => this.onRelations(category)}>
        <Text style={{ color: this.props.customTheme.title, fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold' }}>{value}</Text>
        <Text style={{ color: this.props.customTheme.label, fontSize: 14, fontFamily: 'Roboto' }}>{unit}</Text>
      </TouchableOpacity>
    );
  }

  onReviews = () => {
    const id = this.props.navigation.getParam('id');
    this.props.navigation.navigate('Reviews', {
      id,
      score: this.props.artistProfile.score,
      reviews: this.props.artistProfile.reviews
    });
  }

  onPressItem(item) {
    this.props.navigation.navigate('PopularProduct');
  }

  renderScore(score, marginHorizontal) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={16} color={score > criterion ? this.props.customTheme.palette.warning : this.props.customTheme.label} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  renderCard() {
    const { avatar, followers, following, score, reviews } = this.props.artistProfile;

    return (
      <View style={styles.card}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.stats}>
          {this.renderStatsEdge(followers, 'followers', 'followers')}
          <TouchableOpacity onPress={this.onReviews}>
            <View style={{ flex: 1, alignItems: 'center', margin: 16 }}>
              {this.renderScore(score, 2)}
              <Text style={{ color: this.props.customTheme.label, fontSize: 14, marginTop: 4 }}>{reviews} reviews</Text>
            </View>
          </TouchableOpacity>
          {this.renderStatsEdge(following, 'following', 'following')}
        </View>
      </View>
    );
  }

  renderActionBar() {
    return (
      <View style={{
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        marginHorizontal: -2
      }}>
        <Button
          title="Book"
          containerStyle={{ flex: 1, marginHorizontal: 2 }}
          buttonStyle={{ backgroundColor: this.props.customTheme.palette.secondary, ...this.props.customTheme.buttonShadow }}
          titleStyle={{ color: this.props.customTheme.buttonTitle, fontSize: 14 }}
        />
        <Button
          title="Follow"
          containerStyle={{ flex: 1, marginHorizontal: 2 }}
          buttonStyle={{ backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string() }}
          titleStyle={{ color: this.props.customTheme.palette.secondary, fontSize: 14 }}
        />
        <Button
          icon={{
            name: 'paper-plane',
            type: 'font-awesome',
            size: 22,
            color: this.props.customTheme.palette.secondary
          }}
          containerStyle={{ marginHorizontal: 2 }}
          buttonStyle={{ backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string() }}
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
              borderRadius: 4
            }}
            source={{ uri: item.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.title}>
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
    const { fullName, overview, tags, products } = this.props.artistProfile;
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
          color: this.props.customTheme.label
        }}>{overview}</Text>
        {this.renderActionBar()}
        <CategoryBar
          tabs={cateogories}
          activeTabColor={this.props.customTheme.title}
          inactiveTabColor={this.props.customTheme.tagTitle}
          underlineColor={this.props.customTheme.title}
          onSelect={(value) => this.onChangeCategory(value)}
        />
        <View style={styles.container}>
          <FlatList
            data={this.props.artistProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center'
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginVertical: 16
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },
  overview: {
    marginTop: 8,
    marginHorizontal: 24,
    fontFamily: 'Roboto',
    fontSize: 14
  },
  container: {
    flex: 1,
    marginHorizontal: 8
  },
  listItem: {
    margin: 8
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { artistProfile, artistProducts }
}) => ({
  customTheme: theme,
  artistProfile, artistProducts
});

const mapDispatchToProps = (dispacth) => ({
  getArtistProfile: (id) => dispacth(getArtistProfile(id)),
  getArtistProducts: (id, category) => dispacth(getArtistProducts(id, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);

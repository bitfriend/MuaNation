import React, { Component, PureComponent } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

import SceneHeader from '../../components/SceneHeader';
import TabBar from '../../components/TabBar';
import styles from './styles';
import { getArtistProfile, getArtistProducts } from '../../controllers/artist/actions';
import { getFullName } from '../../util';

class ArtistProfile extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getArtistProfile(id);
    this.props.getArtistProducts(id, '');
  }

  onTabChange(category) {
    const id = this.props.navigation.getParam('id');
    this.props.getArtistProducts(id, category);
  }

  onRelations(category) {
    const id = this.props.navigation.getParam('id');
    const fullName = getFullName(this.props.artistProfile);
    this.props.navigation.navigate('Relations', { id, fullName, category });
  }

  renderStatsEdge(value, unit, category) {
    return (
      <TouchableOpacity style={{ alignItems: 'center', margin: 16 }} onPress={() => this.onRelations(category)}>
        <Text style={{ color: '#17050b', fontSize: 18, fontFamily: 'Roboto', fontWeight: 'bold' }}>{value}</Text>
        <Text style={{ color: '#97898e', fontSize: 14, fontFamily: 'Roboto' }}>{unit}</Text>
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

  renderScore(score, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={16} color={score > criterion ? '#fabc3c' : '#dcd7d9'} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  renderCard() {
    const { avatar, followers, following, score, reviews } = this.props.artistProfile;

    return (
      <View style={customStyles.card}>
        <Image source={{ uri: avatar }} style={customStyles.avatar} />
        <View style={customStyles.stats}>
          {this.renderStatsEdge(followers, 'followers', 'followers')}
          <TouchableOpacity onPress={this.onReviews}>
            <View style={{ flex: 1, alignItems: 'center', margin: 16 }}>
              {this.renderScore(score, 2)}
              <Text style={{ color: '#97898e', fontSize: 14, marginTop: 4 }}>{reviews} reviews</Text>
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
          buttonStyle={{ backgroundColor: '#ef3475', elevation: 6 }}
          titleStyle={{ color: 'white', fontSize: 14 }}
        />
        <Button
          title="Follow"
          containerStyle={{ flex: 1, marginHorizontal: 2 }}
          buttonStyle={{ backgroundColor: 'rgba(239, 68, 146, 0.1)' }}
          titleStyle={{ color: '#ef3475', fontSize: 14 }}
        />
        <Button
          icon={{
            name: 'paper-plane',
            type: 'font-awesome',
            size: 22,
            color: '#ef3475'
          }}
          containerStyle={{ marginHorizontal: 2 }}
          buttonStyle={{ backgroundColor: 'rgba(239, 68, 146, 0.1)' }}
        />
      </View>
    );
  }

  render() {
    const { overview, tags, products } = this.props.artistProfile;
    let cateogories = [{ label: 'All', value: '' }];
    if (tags)
      tags.map((tag, index) => cateogories.push({ label: tag, value: tag }));

    let images = [];
    this.props.artistProducts.map((product) => images.push(product.image));

    return (
      <View style={styles.container}>
        <SceneHeader title={getFullName(this.props.artistProfile)} />
        {this.renderCard()}
        <Text style={customStyles.overview}>{overview}</Text>
        {this.renderActionBar()}
        <TabBar
          tabs={cateogories}
          activeTabColor="#17050b"
          inactiveTabColor="#97898e"
          underlineColor="#17050b"
          onSelect={(value) => this.onTabChange(value)}
        />
        <View style={customStyles.container}>
          <ImageCacheProvider
            urlsToPreload={images}
            onPreloadComplete={() => console.log('images cached')}
          >
            <FlatList
              data={this.props.artistProducts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity style={customStyles.listItem}>
                  <Product {...item} />
                </TouchableOpacity>
              )}
              numColumns={2}
            />
          </ImageCacheProvider>
        </View>
      </View>
    );
  }
}

class Product extends PureComponent {
  render() {
    const { image, name, price } = this.props;

    const { width: windowWidth } = Dimensions.get('window');
    const imageWidth = (windowWidth - 16 * 3) / 2;
    const imageHeight = Math.floor(imageWidth * 0.8);

    return (
      <View>
        <CachedImage source={{ uri: image }} style={{ width: imageWidth, height: imageHeight, borderRadius: 4 }} />
        <View style={customStyles.title}>
          <Text style={customStyles.name}>{name}</Text>
          <Text style={customStyles.price}>${price}</Text>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
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
    marginHorizontal: 16,
    color: '#513a42',
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
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  price: {
    color: '#ef3475',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  artist: { artistProfile, artistProducts }
}) => ({
  artistProfile, artistProducts
});

const mapDispatchToProps = (dispacth) => ({
  getArtistProfile: (id) => dispacth(getArtistProfile(id)),
  getArtistProducts: (id, category) => dispacth(getArtistProducts(id, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);

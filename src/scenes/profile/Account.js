import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import CategoryBar from '../../components/CategoryBar';
import { getArtist, getArtistProducts } from '../../controllers/artist/actions';

const criteria = [0, 1, 2, 3, 4];

class Account extends Component {
  componentDidMount() {
    const { width } = Dimensions.get('window');
    this.imageWidth = (width - EStyleSheet.value('16rem') * 3) / 2;
    this.imageHeight = this.imageWidth * 0.8;

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
        <Text style={sideStyles.value}>{value}</Text>
        <Text style={sideStyles.unit}>{unit}</Text>
      </TouchableOpacity>
    );
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
            containerStyle={reviewStyles.star}
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
                {this.renderScore(score)}
                <Text style={reviewStyles.text}>{reviews} reviews</Text>
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
          title="Add service"
          containerStyle={bookStyles.container}
          buttonStyle={bookStyles.button}
          titleStyle={bookStyles.title}
          onPress={() => this.props.navigation.navigate('AddService')}
        />
        <ThemeButton
          title="Edit info"
          containerStyle={followStyles.container}
          buttonStyle={followStyles.button}
          titleStyle={followStyles.title}
          isPrimary={false}
          onPress={() => this.props.navigation.navigate('EditInfo')}
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
              borderRadius: EStyleSheet.value('8rem')
            }}
            source={{ uri: item.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.caption}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { fullName, overview, tags, products } = this.props.currentArtist;
    let cateogories = [{ label: 'All', value: '' }];
    if (tags) {
      tags.map((tag, index) => cateogories.push({ label: tag, value: tag }));
    }

    let images = [];
    this.props.artistProducts.map((product) => images.push(product.image));

    return (
      <View style={styles.container}>
        <SceneHeader title={fullName} leftIcon={{
          icon: 'paper-plane',
          type: 'font-awesome',
          color: EStyleSheet.value('$grey0Color'),
          size: EStyleSheet.value('20rem'),
          iconStyle: styles.leftIcon,
          containerStyle: { marginLeft: 0 },
          onPress: () => this.props.navigation.navigate('Chats')
        }} rightIcon={{
          icon: 'cog',
          type: 'font-awesome',
          color: EStyleSheet.value('$grey0Color'),
          size: EStyleSheet.value('20rem'),
          iconStyle: styles.rightIcon,
          containerStyle: { marginLeft: 0 },
          onPress: () => this.props.navigation.navigate('Settings')
        }} />
        {this.renderCard()}
        <Text style={styles.overview}>{overview}</Text>
        {this.renderButtons()}
        <CategoryBar
          tabs={cateogories}
          activeTabColor={EStyleSheet.value('$title')}
          inactiveTabColor={EStyleSheet.value('$tagTitle')}
          underlineColor={EStyleSheet.value('$title')}
          onSelect={(value) => this.onChangeCategory(value)}
        />
        <View style={styles.list}>
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container'
  },
  leftIcon: {
    padding: '10rem',
    transform: [{ rotateY: '180deg' }]
  },
  rightIcon: {
    padding: '10rem'
  },
  card: {
    width: '100%',
    alignItems: 'center'
  },
  avatar: {
    width: '88rem',
    height: '88rem',
    borderRadius: '44rem',
    marginTop: '24rem',
    marginBottom: '16rem'
  },
  statsWrapper: {
    padding: '16rem'
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '80rem',
    paddingHorizontal: '24rem',
    paddingVertical: '18rem'
  },
  overview: {
    marginHorizontal: '24rem',
    color: '$grey0Color',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  buttonBar: {
    flexDirection: 'row',
    width: '100%',
    padding: '16rem'
  },
  list: {
    flex: 1,
    marginHorizontal: '8rem'
  },
  listItem: {
    margin: '8rem'
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '8rem'
  },
  name: {
    flex: 1,
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  price: {
    color: '$secondaryColor',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  }
});

const sideStyles = EStyleSheet.create({
  container: {
    alignItems: 'center'
  },
  value: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  },
  unit: {
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const reviewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  star: {
    marginHorizontal: '2rem'
  },
  text: {
    marginTop: '2rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    textAlign: 'center'
  }
});

const bookStyles = EStyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: '48rem',
    borderRadius: '12rem'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  }
});

const followStyles = EStyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '4rem'
  },
  button: {
    height: '48rem',
    borderRadius: '12rem'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  artist: { currentArtist, artistProducts }
}) => ({
  currentArtist, artistProducts
});

const mapDispatchToProps = (dispacth) => ({
  getArtist: (id) => dispacth(getArtist(id)),
  getArtistProducts: (id, category) => dispacth(getArtistProducts(id, category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

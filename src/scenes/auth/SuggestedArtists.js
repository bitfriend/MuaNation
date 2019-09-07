
import React, { Component, Fragment } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import { getSuggestedArtists } from '../../controllers/artist/actions';
import SceneHeader from '../../components/SceneHeader';
import Carousel from '../../components/carousel';
import styles from './styles';

class SuggestedArtists extends Component {
  componentDidMount() {
    this.props.getSuggestedArtists();
  }

  onClickFollow = () => {
    this.props.navigation.navigate('Featured');
  }

  onClickSkip = () => {}

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

  renderCard(item, index, animatedValue) {
    const { avatar, fullName, checked, tags, score, reviews, products } = item;

    return (
      <View style={{ width: 252, height: 253 }}>
        <Animated.View style={[customStyles.outer, {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]} />
        <View style={customStyles.inner}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, marginBottom: 8 }}>
              <Image source={{ uri: avatar }} style={customStyles.avatar} />
            </View>
            {checked && (
              <Icon type="font-awesome" name="check-circle" size={24} color="#ef3475" />
            )}
          </View>
          <Text style={customStyles.name}>{fullName}</Text>
          <View style={{ flexDirection: 'row', overflow: 'hidden', marginHorizontal: -2, marginTop: 8, marginBottom: 12 }}>
            {tags.map((tag, subIndex) => (
              <Text key={subIndex} style={customStyles.tag}>{tag}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            {this.renderScore(score, 2)}
            <Text style={{ color: '#97898e', fontSize: 10, marginLeft: 4 }}>{reviews} reviews</Text>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            {products.map((product, subIndex) => (
              <Image key={subIndex} style={{ width: 64, height: 64, borderRadius: 4 }} source={{ uri: product }} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Suggested artists</Text>
          <Text style={styles.smallText}>We’ve hand picked several amazing artists around you to follow</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Carousel
            data={this.props.suggestedArtists}
            renderItem={({ item, index, animatedValue }) => this.renderCard(item, index, animatedValue)}
            sliderWidth={windowWidth}
            itemWidth={windowWidth * 0.7}
            slideInterpolatedStyle={this.getAnimatedStyle}
            contentContainerCustomStyle={{ alignItems: 'center' }}
          />
          <Button
            buttonStyle={styles.loginButton}
            title="Follow (1)"
            titleStyle={styles.socialText}
            onPress={this.onClickFollow}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={styles.loginButton}
            title="Skip for now"
            titleStyle={styles.socialText}
            onPress={this.onClickSkip}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  outer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: '#ef3475',
    borderWidth: 2,
    borderRadius: 14
  },
  inner: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
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
  }
});

const mapStateToProps = ({
  artist: { suggestedArtists }
}) => ({
  suggestedArtists
});

const mapDispatchToProps = (dispacth)=>({
  getSuggestedArtists: () => dispacth(getSuggestedArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedArtists);


import React, { Component, Fragment } from 'react';
import { Animated, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import { getSuggestedArtists } from '../../controllers/artist/actions';
import SceneHeader from '../../components/SceneHeader';

const Color = require('color');

const slideWidth = 254;
const slideHeight = 272;
const criteria = [0, 1, 2, 3, 4];

class SuggestedArtists extends Component {
  state = {
    checkedArtists: []
  }

  componentDidMount() {
    this.props.getSuggestedArtists();
  }

  onClickItem(index) {
    if (this.state.checkedArtists.indexOf(index) === -1) {
      const checkedArtists = [...this.state.checkedArtists, index];
      this.setState({ checkedArtists });
    } else {
      const checkedArtists = this.state.checkedArtists.filter(item => item !== index);
      this.setState({ checkedArtists });
    }
  }

  onClickFollow = () => {
    if (this.state.checkedArtists.length === 0) {
      Toast.showWithGravity('Please select the artists to follow.', Toast.SHORT, Toast.CENTER);
      return;
    }
    this.props.navigation.navigate('Featured');
  }

  onClickSkip = () => {
    this.props.navigation.navigate('Featured');
  }

  renderScore(score, marginHorizontal) {
    return (
      <Fragment>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={16}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal }}
          />
        ))}
      </Fragment>
    );
  }

  renderItem = ({ item, index, separators }) => {
    const checked = this.state.checkedArtists.indexOf(index) !== -1;

    return (
      <View style={{ paddingHorizontal: 8, marginVertical: 48 }}>
        <TouchableWithoutFeedback onPress={() => this.onClickItem(index)}>
          <View style={{
            ...styles.card,
            backgroundColor: this.props.customTheme.card,
            ...this.props.customTheme.shadows[3]
          }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flex: 1, marginBottom: 8 }}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              </View>
              {checked && (
                <Icon type="font-awesome" name="check-circle" size={24} color={this.props.customTheme.palette.secondary} />
              )}
            </View>
            <Text style={{
              ...styles.name,
              color: this.props.customTheme.title
            }}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', overflow: 'hidden', marginTop: 10, marginBottom: 16 }}>
              {item.tags.map((tag, subIndex) => (
                <Text key={subIndex} style={{
                  ...styles.tag,
                  marginRight: subIndex < item.tags.length - 1 ? 4 : 0,
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
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.products.map((product, subIndex) => (
                <Image key={subIndex} style={{ width: 64, height: 64, borderRadius: 4 }} source={{ uri: product }} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
        <SceneHeader />
        <View style={{ marginHorizontal: 60 }}>
          <Text style={{
            ...styles.titleText,
            color: this.props.customTheme.title
          }}>Suggested artists</Text>
          <Text style={{
            ...styles.smallText,
            color: this.props.customTheme.label
          }}>We’ve hand picked several amazing artists around you to follow</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.suggestedArtists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            horizontal
            ListHeaderComponent={() => <View style={{ width: 8 }} />}
            ListFooterComponent={() => <View style={{ width: 8 }} />}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: this.props.customTheme.palette.secondary,
              ...this.props.customTheme.buttonShadow
            }}
            title={`Follow (${this.state.checkedArtists.length})`}
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.buttonTitle
            }}
            onPress={this.onClickFollow}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string()
            }}
            title="Skip for now"
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.palette.secondary
            }}
            onPress={this.onClickSkip}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
  },
  card: {
    width: 254,
    height: 272,
    padding: 24,
    borderRadius: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
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
  reviews: {
    marginLeft: 4,
    fontSize: 10
  },
  button: {
    width: 254,
    height: 48,
    marginTop: 16,
    borderRadius: 12
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { suggestedArtists }
}) => ({
  customTheme: theme,
  suggestedArtists
});

const mapDispatchToProps = (dispacth)=>({
  getSuggestedArtists: () => dispacth(getSuggestedArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedArtists);

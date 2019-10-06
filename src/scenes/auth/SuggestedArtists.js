
import React, { Component, Fragment } from 'react';
import { Animated, FlatList, Image, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import { isEqual } from 'lodash/fp';
import { connect } from 'react-redux';

import { getSuggestedArtists } from '../../controllers/artist/actions';
import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';

const Color = require('color');

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

  renderScore(score, spacing) {
    return (
      <Fragment>
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
      </Fragment>
    );
  }

  renderItem = ({ item, index, separators }) => {
    const checked = this.state.checkedArtists.indexOf(index) !== -1;

    return (
      <View style={{ paddingHorizontal: verticalScale(8), marginVertical: verticalScale(48) }}>
        <TouchableWithoutFeedback onPress={() => this.onClickItem(index)}>
          <View style={{
            ...styles.card,
            borderColor: checked ? this.props.customTheme.palette.secondary : this.props.customTheme.card,
            backgroundColor: this.props.customTheme.card,
            ...this.props.customTheme.shadows[3]
          }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flex: 1, marginBottom: verticalScale(8) }}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              </View>
              {checked && (
                <Icon type="font-awesome" name="check-circle" size={verticalScale(24)} color={this.props.customTheme.palette.secondary} />
              )}
            </View>
            <Text style={{
              ...styles.name,
              color: this.props.customTheme.title
            }}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', overflow: 'hidden', marginTop: verticalScale(10), marginBottom: verticalScale(16) }}>
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
              {this.renderScore(item.score, 2)}
              <Text style={{
                ...styles.reviews,
                color: this.props.customTheme.label
              }}>{item.reviews} reviews</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.products.map((product, subIndex) => (
                <Image key={subIndex} style={{ width: verticalScale(64), height: verticalScale(64), borderRadius: verticalScale(4) }} source={{ uri: product }} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
        <SceneHeader />
        <View style={{ marginHorizontal: verticalScale(60) }}>
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
            ListHeaderComponent={() => <View style={{ width: verticalScale(8) }} />}
            ListFooterComponent={() => <View style={{ width: verticalScale(8) }} />}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <ThemeButton
            buttonStyle={styles.button}
            title={`Follow (${this.state.checkedArtists.length})`}
            titleStyle={styles.buttonTitle}
            onPress={this.onClickFollow}
          />
          <ThemeButton
            buttonStyle={{ ...styles.button, marginTop: verticalScale(16) }}
            title="Skip for now"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickSkip}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingBottom: '16@vs'
  },
  titleText: {
    fontSize: '24@vs',
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  smallText: {
    fontSize: '14@vs',
    fontFamily: 'Roboto',
    marginTop: '16@vs',
    marginBottom: '20@vs'
  },
  card: {
    width: '254@vs',
    height: '272@vs',
    padding: '24@vs',
    borderWidth: '2@vs',
    borderRadius: '12@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  name: {
    fontSize: '16@vs',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tag: {
    paddingHorizontal: '4@vs',
    paddingVertical: '2@vs',
    marginHorizontal: '2@vs',
    borderRadius: '4@vs',
    fontSize: '14@vs',
    textTransform: 'capitalize'
  },
  reviews: {
    marginLeft: '4@vs',
    fontSize: '10@vs'
  },
  button: {
    width: '254@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  buttonTitle: {
    fontSize: '16@vs',
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

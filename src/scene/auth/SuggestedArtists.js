import React, { Component, Fragment } from 'react';
import { FlatList, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import { getSuggestedArtists } from '../../controller/artist/actions';
import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';

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

  renderScore(score) {
    return (
      <Fragment>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={EStyleSheet.value('16rem')}
            color={EStyleSheet.value(score > criterion ? '$fullStar' : '$emptyStar')}
            containerStyle={cardStyles.star}
          />
        ))}
      </Fragment>
    );
  }

  renderItem = ({ item, index, separators }) => {
    const checked = this.state.checkedArtists.indexOf(index) !== -1;

    return (
      <View style={cardStyles.wrapper}>
        <TouchableWithoutFeedback onPress={() => this.onClickItem(index)}>
          <View style={{
            ...cardStyles.container,
            borderColor: EStyleSheet.value(checked ? '$secondaryColor' : '$card'),
            ...this.props.appTheme.styles.shadow4
          }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ flex: 1 }}>
                <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
              </View>
              {checked && (
                <Icon type="font-awesome" name="check-circle" size={EStyleSheet.value('24rem')} color={EStyleSheet.value('$secondaryColor')} />
              )}
            </View>
            <Text style={cardStyles.name}>{item.fullName}</Text>
            <View style={cardStyles.tagBar}>
              {item.tags.map((tag, subIndex) => (
                <Text key={subIndex} style={{
                  ...cardStyles.tag,
                  marginRight: subIndex < item.tags.length - 1 ? EStyleSheet.value('4rem') : 0
                }}>{tag}</Text>
              ))}
            </View>
            <View style={cardStyles.scoreReview}>
              {this.renderScore(item.score)}
              <Text style={cardStyles.reviews}>{item.reviews} reviews</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.products.map((product, subIndex) => (
                <Image key={subIndex} style={cardStyles.product} source={{ uri: product }} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={styles.caption}>
          <Text style={styles.titleText}>Suggested artists</Text>
          <Text style={styles.smallText}>We’ve hand picked several amazing artists around you to follow</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.suggestedArtists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            horizontal
            ListHeaderComponent={() => <View style={styles.listMargin} />}
            ListFooterComponent={() => <View style={styles.listMargin} />}
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
            buttonStyle={{ ...styles.button, marginTop: EStyleSheet.value('16rem') }}
            title="Skip for now"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickSkip}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '16rem',
    backgroundColor: '$container'
  },
  caption: {
    marginHorizontal: '60rem'
  },
  titleText: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  smallText: {
    marginTop: '16rem',
    marginBottom: '20rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  listMargin: {
    width: '8rem'
  },
  button: {
    width: '254rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  }
});

const cardStyles = EStyleSheet.create({
  wrapper: {
    paddingHorizontal: '8rem',
    justifyContent: 'center'
  },
  container: {
    width: '254rem',
    height: '272rem',
    padding: '24rem',
    borderWidth: '2rem',
    borderRadius: '12rem',
    backgroundColor: '$card'
  },
  avatar: {
    width: '48rem',
    height: '48rem',
    borderRadius: '24rem'
  },
  name: {
    marginTop: '8rem',
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tagBar: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: '10rem',
    marginBottom: '16rem'
  },
  tag: {
    marginHorizontal: '2rem',
    borderRadius: '4rem',
    paddingHorizontal: '4rem',
    paddingVertical: '2rem',
    backgroundColor: '$tag',
    color: '$tagTitle',
    fontFamily: 'Roboto',
    fontSize: '14rem',
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
    fontSize: '10rem'
  },
  product: {
    width: '64rem',
    height: '64rem',
    borderRadius: '4rem'
  }
});

const mapStateToProps = ({
  common: { theme },
  artist: { suggestedArtists }
}) => ({
  appTheme: theme,
  suggestedArtists
});

const mapDispatchToProps = (dispacth)=>({
  getSuggestedArtists: () => dispacth(getSuggestedArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedArtists);

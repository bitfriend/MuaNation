import React, { Component, Fragment } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getReviews } from '../../controllers/review/actions';

const criteria = [0, 1, 2, 3, 4];

class Reviews extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getReviews(id);
  }

  renderScore(score, size, marginHorizontal) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={size} color={score > criterion ? this.props.customTheme.palette.warning : this.props.customTheme.label} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={cardStyles.container}>
        <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={{
              ...cardStyles.name,
              color: this.props.customTheme.title
            }}>{item.fullName}</Text>
            {this.renderScore(item.score, 16, 2)}
          </View>
          <Text style={{
            ...cardStyles.overview,
            color: this.props.customTheme.label
          }}>{item.overview}</Text>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            {item.products.map((product, index) => (
              <Image key={index} style={{ width: 48, height: 48, borderRadius: 4 }} source={{ uri: product }} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title={this.props.navigation.getParam('reviews') + ' reviews'} />
        <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 32 }}>
          {this.renderScore(this.props.navigation.getParam('score'), 32, 4)}
        </View>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <FlatList
            data={this.props.reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: this.props.customTheme.palette.grey3 }} />}
          />
        </View>
      </View>
    );
  }
}

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 8
  }
});

const mapStateToProps = ({
  common: { theme },
  review: { reviews }
}) => ({
  customTheme: theme,
  reviews
});

const mapDispatchToProps = (dispacth) => ({
  getReviews: (userId) => dispacth(getReviews(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

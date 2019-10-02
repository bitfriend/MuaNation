import React, { Component, Fragment } from 'react';
import { Image, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getReviews } from '../../controllers/review/actions';

const criteria = [0, 1, 2, 3, 4];

class Reviews extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getReviews(id);
  }

  renderScore(score, size, spacing) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon
            key={index}
            type="font-awesome"
            name="star"
            size={verticalScale(size)}
            color={score > criterion ? this.props.customTheme.fullStar : this.props.customTheme.emptyStar}
            containerStyle={{ marginHorizontal: verticalScale(spacing) }}
          />
        ))}
      </View>
    );
  }

  renderItem = ({ item, index, separators }) => {
    return (
      <View style={cardStyles.container}>
        <Image source={{ uri: item.avatar }} style={cardStyles.avatar} />
        <View style={cardStyles.body}>
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
          <ScrollView horizontal>
            {item.products.map((product, index) => (
              <Image key={index} source={{ uri: product }} style={{
                ...cardStyles.product,
                marginRight: index < item.products.length - 1 ? verticalScale(8) : 0
              }} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View style={{
        height: verticalScale(StyleSheet.hairlineWidth),
        backgroundColor: this.props.customTheme.palette.grey3
      }} />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
        <SceneHeader title={this.props.navigation.getParam('reviews') + ' reviews'} />
        <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 32 }}>
          {this.renderScore(this.props.navigation.getParam('score'), 32, 4)}
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  score: {
    alignItems: 'center',
    marginTop: '28@vs',
    marginBottom: '32@vs'
  },
  list: {
    flex: 1,
    marginHorizontal: '16@vs'
  }
});

const cardStyles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: '16@vs'
  },
  avatar: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '24@vs'
  },
  body: {
    flex: 1,
    paddingLeft: '16@vs'
  },
  name: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    marginVertical: '8@vs'
  },
  product: {
    width: '48@vs',
    height: '48@vs',
    borderRadius: '4@vs'
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

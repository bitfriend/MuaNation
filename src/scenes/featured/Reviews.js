import React, { Component, Fragment } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import { getReviews } from '../../controllers/review/actions';
import styles from './styles';

class Reviews extends Component {
  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    this.props.getReviews(id);
  }

  renderScore(score, size, marginHorizontal) {
    const criteria = [0, 1, 2, 3, 4];
    return (
      <View style={{ flexDirection: 'row' }}>
        {criteria.map((criterion, index) => (
          <Icon key={index} type="font-awesome" name="star" size={size} color={score > criterion ? '#fabc3c' : '#dcd7d9'} containerStyle={{ marginHorizontal }} />
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader title={this.props.navigation.getParam('reviews') + ' reviews'} />
        <View style={{ alignItems: 'center', marginTop: 28, marginBottom: 32 }}>
          {this.renderScore(this.props.navigation.getParam('score'), 32, 4)}
        </View>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <FlatList
            data={this.props.reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index, separators }) => {
              const { avatar, fullName, score, overview, products } = item;
              const criteria = [0, 1, 2, 3, 4];
              return (
                <View style={cardStyles.container}>
                  <Image source={{ uri: avatar }} style={cardStyles.avatar} />
                  <View style={{ flex: 1, paddingLeft: 16 }}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <Text style={cardStyles.name}>{fullName}</Text>
                      {this.renderScore(score, 16, 2)}
                    </View>
                    <Text style={cardStyles.overview}>{overview}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {products.map((product, index) => (
                        <Image key={index} style={{ width: 48, height: 48, borderRadius: 4 }} source={{ uri: product }} />
                      ))}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomColor: '#dcd7d9',
    borderBottomWidth: 1
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  name: {
    flex: 1,
    color: '#17050b',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  overview: {
    width: '100%',
    color: '#513a42',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 8
  }
});

const mapStateToProps = ({
  review: { reviews }
}) => ({
  reviews
});

const mapDispatchToProps = (dispacth) => ({
  getReviews: (userId) => dispacth(getReviews(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

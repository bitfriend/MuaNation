import React, { Component } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default class Discover extends Component {
  state = {
    drawed: false
  };

  animatedValue = new Animated.Value(0);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={customStyles.container}>
          <MapView style={customStyles.map} />
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

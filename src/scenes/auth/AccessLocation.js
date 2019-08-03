
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';

import SceneHeader from '../../components/SceneHeader';
import styles from './styles';

export default class AccessLocation extends Component {
  onClickAllow = () => {
    this.props.navigation.navigate('SuggestedArtists');
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Location access</Text>
          <Text style={styles.smallText}>We want to help you find best services around, for that we need to know your current location</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={customStyles.banner} source={require('../../../assets/images/ph-location.png')} />
          <Button
            buttonStyle={styles.loginButton}
            title="Allow location access"
            titleStyle={styles.socialText}
            onPress={this.onClickAllow}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    )
  }
}

const customStyles = StyleSheet.create({
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 30
  }
});


import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';

import SceneHeader from '../../components/SceneHeader';
import colors from '../../components/theme/colors';

export default class AccessLocation extends Component {
  onClickAllow = () => {
    this.props.navigation.navigate('SuggestedArtists');
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Location access</Text>
          <Text style={styles.smallText}>We want to help you find best services around, for that we need to know your current location</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/ph-location.png')} />
          <Button
            buttonStyle={styles.button}
            title="Allow location access"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickAllow}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: colors.smokyBlack,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  smallText: {
    color: colors.taupeGray,
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 30
  },
  button: {
    width: 254,
    height: 48,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: colors.mulberry,
    ...Platform.select({
      ios: {
        shadowRadius: 16,
        shadowColor: colors.roseBonbon,
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 6 }
      },
      android: {
        elevation: 6
      }
    })
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});


import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';

const Color = require('color');

class AccessLocation extends Component {
  onClickAllow = () => {
    this.props.navigation.navigate('SuggestedArtists');
  }

  render() {
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={{
            ...styles.titleText,
            color: this.props.customTheme.title
          }}>Location access</Text>
          <Text style={{
            ...styles.smallText,
            color: this.props.customTheme.label
          }}>We want to help you find best services around, for that we need to know your current location</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/ph-location.png')} />
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: this.props.customTheme.palette.secondary,
              ...this.props.customTheme.buttonShadow
            }}
            title="Allow location access"
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.buttonTitle
            }}
            onPress={this.onClickAllow}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    )
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
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(AccessLocation);

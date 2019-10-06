
import React, { Component } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';

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
        <View style={{ marginHorizontal: verticalScale(60) }}>
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
          <ThemeButton
            buttonStyle={styles.button}
            title="Allow location access"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickAllow}
          />
        </View>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingBottom: '16@vs'
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  smallText: {
    marginTop: '20@vs',
    marginBottom: '10@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: '48@vs'
  },
  button: {
    width: '254@vs',
    height: '48@vs',
    marginTop: '16@vs',
    borderRadius: '12@vs'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(AccessLocation);

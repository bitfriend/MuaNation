
import React, { Component } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';

const Color = require('color');

class ImportMedia extends Component {
  onClickImportInstagram = () => {}

  onClickImportCameraRoll = () => {}

  onClickSkip = () => {
    this.props.navigation.navigate('AccessLocation');
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
          }}>Import your media</Text>
          <Text style={{
            ...styles.smallText,
            color: this.props.customTheme.label
          }}>Do you want to import photos of products &amp; services you've performed?</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/ph-photos.png')} />
          <ThemeButton
            buttonStyle={styles.button}
            icon={{
              name: 'instagram',
              type: 'font-awesome',
              size: verticalScale(20),
              containerStyle: { marginRight: verticalScale(10) }
            }}
            title="Import from Instagram"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickImportInstagram}
          />
          <ThemeButton
            buttonStyle={{ ...styles.button, marginTop: verticalScale(16) }}
            icon={{
              name: 'camera',
              type: 'font-awesome',
              size: verticalScale(20),
              containerStyle: { marginRight: verticalScale(10) }
            }}
            title="Import from Camera roll"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickImportCameraRoll}
          />
          <ThemeButton
            buttonStyle={{ ...styles.button, marginTop: verticalScale(16) }}
            title="Skip for now"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickSkip}
            isPrimary={false}
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
    marginTop: '20@vs',
    marginBottom: '10@vs'
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: '30@vs'
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
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(ImportMedia);

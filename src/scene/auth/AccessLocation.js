
import React, { PureComponent } from 'react';
import { Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';

export default class AccessLocation extends PureComponent {
  onClickAllow = () => {
    this.props.navigation.navigate('SuggestedArtists');
  }

  render = () => (
    <View style={styles.container}>
      <SceneHeader />
      <View style={styles.caption}>
        <Text style={styles.titleText}>Location access</Text>
        <Text style={styles.smallText}>We want to help you find best services around, for that we need to know your current location</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/image/ph-location.png')} />
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
    marginTop: '20rem',
    marginBottom: '10rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: '48rem'
  },
  button: {
    width: '254rem',
    height: '48rem',
    marginTop: '16rem',
    borderRadius: '12rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  }
});

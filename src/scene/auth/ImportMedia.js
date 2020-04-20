
import React, { PureComponent } from 'react';
import { Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';

export default class ImportMedia extends PureComponent {
  onClickImportInstagram = () => {}

  onClickImportCameraRoll = () => {}

  onClickSkip = () => {
    this.props.navigation.navigate('AccessLocation');
  }

  render = () => (
    <View style={styles.container}>
      <SceneHeader />
      <View style={styles.caption}>
        <Text style={styles.titleText}>Import your media</Text>
        <Text style={styles.smallText}>Do you want to import photos of products &amp; services you've performed?</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/image/ph-photos.png')} />
        <ThemeButton
          buttonStyle={styles.button}
          icon={{
            name: 'instagram',
            type: 'font-awesome',
            size: EStyleSheet.value('20rem'),
            containerStyle: styles.buttonIcon
          }}
          title="Import from Instagram"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickImportInstagram}
        />
        <ThemeButton
          buttonStyle={{ ...styles.button, marginTop: EStyleSheet.value('16rem') }}
          icon={{
            name: 'camera',
            type: 'font-awesome',
            size: EStyleSheet.value('20rem'),
            containerStyle: styles.buttonIcon
          }}
          title="Import from Camera roll"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickImportCameraRoll}
        />
        <ThemeButton
          buttonStyle={{ ...styles.button, marginTop: EStyleSheet.value('16rem') }}
          title="Skip for now"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickSkip}
          isPrimary={false}
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
    marginBottom: '10rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    marginTop: '20rem'
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: '30rem'
  },
  button: {
    width: '254rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  buttonIcon: {
    marginRight: '10rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  }
});

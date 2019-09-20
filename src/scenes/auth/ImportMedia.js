
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';

import SceneHeader from '../../components/SceneHeader';
import colors from '../../components/theme/colors';

export default class ImportMedia extends Component {
  onClickImportInstagram = () => {}

  onClickImportCameraRoll = () => {}

  onClickSkip = () => {
    this.props.navigation.navigate('AccessLocation');
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 30 }}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Import your media</Text>
          <Text style={styles.smallText}>Do you want to import photos of products &amp; services you've performed?</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/ph-photos.png')} />
          <Button
            buttonStyle={[styles.button, styles.primaryButton]}
            icon={{ name: 'instagram', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
            title="Import from Instagram"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickImportInstagram}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={[styles.button, styles.primaryButton]}
            icon={{ name: 'camera', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
            title="Import from Camera roll"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickImportCameraRoll}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={[styles.button, styles.secondaryButton]}
            title="Skip for now"
            titleStyle={[styles.buttonTitle, { color: colors.mulberry }]}
            onPress={this.onClickSkip}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    );
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
    borderRadius: 12
  },
  primaryButton: {
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
  secondaryButton: {
    backgroundColor: colors.mulberry + '19' // alpha 10%
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});

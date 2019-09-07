
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';

import SceneHeader from '../../components/SceneHeader';
import styles from './styles';

export default class ImportMedia extends Component {
  onClickImportInstagram = () => {}

  onClickImportCameraRoll = () => {}

  onClickSkip = () => {
    this.props.navigation.navigate('AccessLocation');
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Import your media</Text>
          <Text style={styles.smallText}>Do you want to import photos of products &amp; services you've performed?</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image resizeMode="contain" style={customStyles.banner} source={require('../../../asset/images/ph-photos.png')} />
          <Button
            buttonStyle={styles.loginButton}
            icon={{
              name: 'instagram',
              type: 'font-awesome',
              size: 20,
              color: 'white',
              containerStyle: { marginRight: 10 }
            }}
            title="Import from Instagram"
            titleStyle={styles.socialText}
            onPress={this.onClickImportInstagram}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={styles.loginButton}
            icon={{
              name: 'camera',
              type: 'font-awesome',
              size: 20,
              color: 'white',
              containerStyle: { marginRight: 10 }
            }}
            title="Import from Camera roll"
            titleStyle={styles.socialText}
            onPress={this.onClickImportCameraRoll}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={styles.loginButton}
            title="Skip for now"
            titleStyle={styles.socialText}
            onPress={this.onClickSkip}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  banner: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 30
  }
});

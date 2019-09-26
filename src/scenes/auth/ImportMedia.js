
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';

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
        <View style={{ marginHorizontal: 50 }}>
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
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: this.props.customTheme.palette.secondary,
              ...this.props.customTheme.buttonShadow
            }}
            icon={{
              name: 'instagram',
              type: 'font-awesome',
              size: 20,
              color: this.props.customTheme.buttonTitle,
              containerStyle: { marginRight: 10 }
            }}
            title="Import from Instagram"
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.buttonTitle
            }}
            onPress={this.onClickImportInstagram}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: this.props.customTheme.palette.secondary,
              ...this.props.customTheme.buttonShadow
            }}
            icon={{
              name: 'camera',
              type: 'font-awesome',
              size: 20,
              color: this.props.customTheme.buttonTitle,
              containerStyle: { marginRight: 10 }
            }}
            title="Import from Camera roll"
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.buttonTitle
            }}
            onPress={this.onClickImportCameraRoll}
            TouchableComponent={TouchableOpacity}
          />
          <Button
            buttonStyle={{
              ...styles.button,
              backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string()
            }}
            title="Skip for now"
            titleStyle={{
              ...styles.buttonTitle,
              color: this.props.customTheme.palette.secondary
            }}
            onPress={this.onClickSkip}
            TouchableComponent={TouchableOpacity}
          />
        </View>
      </View>
    );
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
    borderRadius: 12
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

export default connect(mapStateToProps)(ImportMedia);

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import SceneHeader from '../../components/SceneHeader';
import styles from './styles';

export default class CreateAccount extends Component {
  state = {
    role: 'artist'
  };

  onClickFacebook = () => {
    this.props.navigation.navigate('ImportMedia');
  }

  onClickInstagram = () => {
    this.props.navigation.navigate('ImportMedia');
  }

  renderItem({ checked, title, description, onPress }) {
    return (
      <TouchableOpacity
        style={[customStyles.selectItem, checked ? { borderColor: '#ef3475' } : { borderColor: '#97898e' }]}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Text style={[styles.middleText, customStyles.middleText, checked ? { color: '#ef3475' } : {}]}>{title}</Text>
          {checked ? (
            <Icon type="material" name="radio-button-checked" size={20} color="#ef3475" />
          ) : (
            <Icon type="material" name="radio-button-unchecked" size={20} color="black" />
          )}
        </View>
        <Text style={styles.smallText}>{description}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ flex: 1, marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Create an account</Text>
          <Text style={styles.smallText}>Please select how do you want to use the app</Text>
          <View style={{ flex: 1 }}>
            {this.renderItem({
              checked: this.state.role === 'artist',
              title: 'As an Artist',
              description: "I'll showcase and sell my services on the platform",
              onPress: () => this.setState({ role: 'artist' })
            })}
            {this.renderItem({
              checked: this.state.role === 'client',
              title: 'As a Client',
              description: "I'll find and book services from the best artists around",
              onPress: () => this.setState({ role: 'client' })
            })}
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              buttonStyle={styles.loginButton}
              icon={{
                name: 'facebook',
                type: 'font-awesome',
                size: 20,
                color: 'white',
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Facebook"
              titleStyle={styles.socialText}
              onPress={this.onClickFacebook}
              TouchableComponent={TouchableOpacity}
            />
            <Button
              buttonStyle={styles.loginButton}
              icon={{
                name: 'instagram',
                type: 'font-awesome',
                size: 20,
                color: 'white',
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Instagram"
              titleStyle={styles.socialText}
              onPress={this.onClickInstagram}
              TouchableComponent={TouchableOpacity}
            />
          </View>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  middleText: {
    marginHorizontal: 0,
    flex: 1
  },
  selectItem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 20
  }
});

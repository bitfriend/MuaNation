
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SceneHeader from '../../components/SceneHeader';
import styles from './styles';

export default class ChooseRole extends Component {
  onClickArtist = () => {
    this.props.navigation.navigate('ImportMedia');
  }

  onClickClient = () => {
    this.props.navigation.navigate('ImportMedia');
  }

  renderItem({ icon, title, description, onPress }) {
    return (
      <TouchableOpacity style={customStyles.selectItem} onPress={onPress}>
        <Image resizeMode="contain" style={customStyles.banner} source={icon} />
        <Text style={styles.middleText}>{title}</Text>
        <Text style={[styles.smallText, { marginHorizontal: 20 }]}>{description}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ flex: 1, marginHorizontal: 50 }}>
          <Text style={styles.titleText}>Choose a role</Text>
          <Text style={styles.smallText}>Please select how do you want to use the app</Text>
          <View style={{ flex: 1 }}>
            {this.renderItem({
              icon: require('../../../assets/images/man_painting.png'),
              title: 'As an Artist',
              description: "I'll showcase and sell my services on the platform",
              onPress: this.onClickArtist
            })}
            {this.renderItem({
              icon: require('../../../assets/images/woman_with_phone.png'),
              title: 'As a Client',
              description: "I'll find and book services from the best artists around",
              onPress: this.onClickClient
            })}
          </View>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  selectItem: {
    width: '100%',
    flex: 1,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 20
  },
  banner: {
    flex: 1,
    resizeMode: 'contain',
    margin: 10
  }
});

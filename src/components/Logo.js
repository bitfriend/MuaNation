
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'baseline', marginTop: 20}}>

          <Text style={styles.welcomeText}>Welcome to</Text>

          <View style={{margin: 10}}>

            <Text style={styles.muaText}>Mua's</Text>
            <Text style={styles.smallText}>place for professionals</Text>

          </View>

        </View>

        <Image source={require('../../assets/images/logo.png')} style={styles.image} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 204,
    height: 187,
  },
  welcomeText: {
    color: '#17050b',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
  muaText: {
    color: '#ef3475',
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
  smallText: {
    color: '#97898e',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
});

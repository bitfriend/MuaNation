import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // Get user token
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    try {
      const userToken = await AsyncStorage.getItem("token");
      this.props.navigation.navigate(userToken ? 'AppTabNav' : 'AuthStackNav');
      // this.props.navigation.navigate('AuthStackNav');
    } catch(e) {
      this.props.navigation.navigate('AuthStackNav');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#ed7d3a', '#ce4d82']}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ width: 72, height: 72, backgroundColor: 'white' }} />
        </View>
      </LinearGradient>
    );
  }
}

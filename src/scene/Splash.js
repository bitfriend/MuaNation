import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Splash extends PureComponent {
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
  render = () => (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[EStyleSheet.value('$gradient0StartColor'), EStyleSheet.value('$gradient0EndColor')]}
      style={styles.gradient}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image source={require('../../asset/image/logo.png')} style={styles.logo} />
      </View>
    </LinearGradient>
  )
}

const styles = EStyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '180rem',
    height: '172rem'
  }
});

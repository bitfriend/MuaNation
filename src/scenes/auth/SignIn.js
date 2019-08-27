import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import styles from './styles';
import { signInWithFacebook } from '../../controllers/auth/actions';

class SignIn extends Component {
  onClickFacebook = () => {
    this.props.signInWithFacebook((error) => {
      Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
    });
  }

  onClickInstagram = () => {
    // this.props.navigation.navigate('ChooseRole');
    // this.props.navigation.navigate('AppTabNav');
    this.instagramLogin.show();
  }

  onClickSignup = () => {
    this.props.navigation.navigate('CreateAccount');
  }

  renderLogo() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center'
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={customStyles.welcome}>Welcome to</Text>
          <View style={{ margin: 10 }}>
            <Text style={customStyles.mua}>Mua's</Text>
            <Text style={customStyles.place}>place for professionals</Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
          <Swiper>
            <View>
              <Image resizeMode="contain" style={customStyles.banner} source={require('../../../assets/images/logo.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={customStyles.banner} source={require('../../../assets/images/logo.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={customStyles.banner} source={require('../../../assets/images/logo.png')} />
            </View>
          </Swiper>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        {this.renderLogo()}
        <Button
          buttonStyle={styles.loginButton}
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: 20,
            color: 'white',
            containerStyle: { marginRight: 10 }
          }}
          title="Login with Facebook"
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
          title="Login with Instagram"
          titleStyle={styles.socialText}
          onPress={this.onClickInstagram}
          TouchableComponent={TouchableOpacity}
        />
        <InstagramLogin
          ref={c => this.instagramLogin = c}
          clientId="2862949e166644b3a94fc2c483d744f2"
          redirectUrl="https://muanation.com/"
          scopes={['basic']}
          onLoginSuccess={(token) => console.log('Instagram login succeeded', token)}
          onLoginFailure={(reason) => console.log('Instagram login failed', reason)}
        />
        <Text style={styles.smallText}>New to the platform?</Text>
        <Button
          buttonStyle={styles.loginButton}
          title="Create an account"
          titleStyle={styles.socialText}
          onPress={this.onClickSignup}
          TouchableComponent={TouchableOpacity}
        />
      </View>
    )
  }
}

const customStyles = StyleSheet.create({
  welcome: {
    color: '#17050b',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },
  mua: {
    color: '#ef3475',
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },
  place: {
    color: '#97898e',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  banner: {
    width: '100%',
    height: '100%'
  }
});

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

const mapDispatchToProps = (dispacth) => ({
  signInWithFacebook: (onError) => dispacth(signInWithFacebook(onError))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

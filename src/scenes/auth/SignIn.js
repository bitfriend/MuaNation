import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { AccessToken, GraphRequest, LoginManager } from 'react-native-fbsdk';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import styles from './styles';

class SignIn extends Component {
  facebookToken = null;
  instagramToken = null;

  onClickFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        console.log('facebook login successful', result);
        if (result.isCancelled) {
          console.log('facebook login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (result) => {
              this.facebookToken = result.accessToken;
              const infoRequest = new GraphRequest('/me', {
                accessToken: this.facebookToken,
                parameters: {
                  fields: { string: 'email,name,first_name,middle_name,last_name' }
                }
              }, (error, result) => {
                if (error) {
                  console.log('facebook get info failed', error);
                  Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
                } else {
                  console.log('facebook login successful', result);
                }
              });
            },
            (reason) => {
              console.log('facebook get token failed', reason);
              Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
            }
          );
        }
      },
      (reason) => {
        console.log('facebook login failed', reason);
      }
    ).catch(reason => {
      console.log('facebook login failed', reason);
    });
  }

  onClickInstagram = () => {
    // this.props.navigation.navigate('ChooseRole');
    this.props.navigation.navigate('AppTabNav');
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

export default connect(mapStateToProps)(SignIn);

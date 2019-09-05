import React, { Component } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import styles from './styles';
import { signInWithFacebook, signInWithInstagram } from '../../controllers/auth/actions';
import * as types from '../../controllers/auth/types';

class SignIn extends Component {
  state = {
    emailModal: false,
    instagramEmail: '',
    instagramToken: ''
  };

  componentDidMount() {
    // CookieManager.clearAll().then((res) => {
    //   console.log('CookieManager.clearAll =>', res);
    // });
  }

  onClickFacebook = () => {
    this.props.signInWithFacebook((error) => {
      Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
    });
  }

  onClickInstagram = () => {
    this.instagramLogin.show();
  }

  onClickSignup = () => {
    this.props.navigation.navigate('CreateAccount');
  }

  renderGallery() {
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

  renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.emailModal}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            padding: 5
          }}>
            <Text style={{
              fontSize: 16,
              padding: 10
            }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              leftIcon={{
                name: 'envelope',
                type: 'font-awesome',
                size: 20,
                color: '#97898e'
              }}
              placeholder="Email"
              placeholderTextColor="#97898e"
              onChangeText={(instagramEmail) => this.setState({ instagramEmail })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={{
                  flex: 1,
                  padding: 5
                }}
                title="OK"
                onPress={() => {
                  this.setState({ emailModal: false });
                  this.props.signInWithInstagram(this.state.instagramToken, this.state.instagramEmail, (reason) => Alert.alert(reason));
                }}
              />
              <Button
                containerStyle={{
                  flex: 1,
                  padding: 5
                }}
                title="Cancel"
                onPress={() => this.setState({ emailModal: false })}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        {this.renderGallery()}
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
          onLoginSuccess={(token) => {
            console.log('Instagram login succeeded', token);
            this.setState({
              emailModal: true,
              instagramToken: token
            });
          }}
          onLoginFailure={(reason) => {
            console.log('Instagram login failed', reason);
            this.props.signInWithInstagramFailure();
            Alert.alert(reason);
          }}
        />
        <Text style={styles.smallText}>New to the platform?</Text>
        <Button
          buttonStyle={styles.loginButton}
          title="Create an account"
          titleStyle={styles.socialText}
          onPress={this.onClickSignup}
          TouchableComponent={TouchableOpacity}
        />
        {this.renderModal()}
      </View>
    );
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
  signInWithFacebook: (onError) => dispacth(signInWithFacebook(onError)),
  signInWithInstagram: (token, email, onError) => dispacth(signInWithInstagram(token, email, onError)),
  signInWithInstagramFailure: () => dispacth({ type: types.SIGN_IN_WITH_INSTAGRAM_FAILURE })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

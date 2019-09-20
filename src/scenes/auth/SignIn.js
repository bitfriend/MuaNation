import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import colors from '../../components/theme/colors';
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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.welcome}>Welcome to</Text>
          <View style={{ margin: 10 }}>
            <Text style={styles.mua}>Mua's</Text>
            <Text style={styles.place}>place for professionals</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Swiper>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/logo1.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/logo2.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/logo3.png')} />
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
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 12, marginHorizontal: 10, padding: 5 }}>
            <Text style={{ fontSize: 16, padding: 10 }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              leftIcon={{ name: 'envelope', type: 'font-awesome', size: 20, color: colors.taupe }}
              placeholder="Email"
              placeholderTextColor={colors.taupeGray}
              onChangeText={(instagramEmail) => this.setState({ instagramEmail })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{ backgroundColor: colors.mulberry, borderRadius: 12 }}
                title="OK"
                onPress={() => {
                  this.setState({ emailModal: false });
                  this.props.signInWithInstagram(this.state.instagramToken, this.state.instagramEmail, (reason) => Alert.alert(reason));
                }}
              />
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{
                  backgroundColor: colors.mulberry + '19', // alpha 10%
                  borderRadius: 12
                }}
                title="Cancel"
                titleStyle={{ color: colors.mulberry }}
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
      <View style={{ flex: 1, alignItems: 'center', paddingBottom: 30 }}>
        {this.renderGallery()}
        <Button
          buttonStyle={[styles.button, styles.primaryButton]}
          icon={{ name: 'facebook', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
          title="Login with Facebook"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickFacebook}
          TouchableComponent={TouchableOpacity}
        />
        <Button
          buttonStyle={[styles.button, styles.primaryButton]}
          icon={{ name: 'instagram', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
          title="Login with Instagram"
          titleStyle={styles.buttonTitle}
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
        <Text style={styles.question}>New to the platform?</Text>
        <Button
          buttonStyle={[styles.button, styles.secondaryButton]}
          title="Create an account"
          titleStyle={[styles.buttonTitle, { color: colors.mulberry }]}
          onPress={this.onClickSignup}
          TouchableComponent={TouchableOpacity}
        />
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    color: colors.smokyBlack,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },
  mua: {
    color: colors.mulberry,
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },
  place: {
    color: colors.taupeGray,
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: 254,
    height: 48,
    marginTop: 16,
    borderRadius: 12
  },
  primaryButton: {
    backgroundColor: colors.mulberry,
    ...Platform.select({
      ios: {
        shadowRadius: 16,
        shadowColor: colors.mulberry,
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 6 }
      },
      android: {
        elevation: 6
      }
    })
  },
  secondaryButton: {
    backgroundColor: colors.mulberry + '19' // alpha 10%
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  question: {
    color: colors.taupeGray,
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
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

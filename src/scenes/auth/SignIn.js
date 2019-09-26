import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import { signInWithFacebook, signInWithInstagram } from '../../controllers/auth/actions';
import * as types from '../../controllers/auth/types';

const Color = require('color');

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
    this.props.signInWithFacebook(this.props.navigation, (error) => {
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
          <Text style={{
            color: this.props.customTheme.palette.grey0,
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Lato'
          }}>Welcome to</Text>
          <View style={{ margin: 10 }}>
            <Text style={{
              color: this.props.customTheme.palette.secondary,
              fontSize: 38,
              fontWeight: 'bold',
              fontFamily: 'Lato'
            }}>Mua's</Text>
            <Text style={{
              color: this.props.customTheme.palette.grey2,
              fontSize: 14,
              fontFamily: 'Roboto'
            }}>place for professionals</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Swiper
            dotColor={Color(this.props.customTheme.palette.grey0).alpha(0.3).string()}
            dotStyle={styles.pageDot}
            activeDotColor={this.props.customTheme.palette.grey0}
            activeDotStyle={styles.pageDot}
          >
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/splash1.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/splash2.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/images/splash3.png')} />
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
        <View style={{ flex: 1, backgroundColor: this.props.customTheme.overlays[0], justifyContent: 'center' }}>
          <View style={{ backgroundColor: this.props.customTheme.palette.grey5, borderRadius: 12, marginHorizontal: 10, padding: 5 }}>
            <Text style={{ color: this.props.customTheme.palette.grey2, fontSize: 16, padding: 10 }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              inputContainerStyle={{ backgroundColor: this.props.customTheme.palette.grey4 }}
              leftIcon={{ name: 'envelope', type: 'font-awesome', size: 20, color: this.props.customTheme.palette.grey1 }}
              placeholder="Email"
              placeholderTextColor={this.props.customTheme.palette.grey2}
              inputStyle={{ color: this.props.customTheme.palette.grey1 }}
              onChangeText={(instagramEmail) => this.setState({ instagramEmail })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{
                  backgroundColor: this.props.customTheme.palette.secondary,
                  borderRadius: 12
                }}
                title="OK"
                titleStyle={{ color: this.props.customTheme.palette.grey5 }}
                onPress={() => {
                  this.setState({ emailModal: false });
                  this.props.signInWithInstagram(this.state.instagramToken, this.state.instagramEmail, this.props.navigation, (reason) => Alert.alert(reason));
                }}
              />
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{
                  backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string(),
                  borderRadius: 12
                }}
                title="Cancel"
                titleStyle={{ color: this.props.customTheme.palette.secondary }}
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
      <View style={{ flex: 1, alignItems: 'center', paddingBottom: 30, backgroundColor: this.props.customTheme.palette.grey5 }}>
        {this.renderGallery()}
        <Button
          buttonStyle={{
            ...styles.button,
            backgroundColor: this.props.customTheme.palette.secondary,
            ...this.props.customTheme.buttonShadow
          }}
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: 20,
            color: this.props.customTheme.palette.grey5,
            containerStyle: { marginRight: 10 }
          }}
          title="Login with Facebook"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.palette.grey5
          }}
          onPress={this.onClickFacebook}
          TouchableComponent={TouchableOpacity}
        />
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
            color: this.props.customTheme.palette.grey5,
            containerStyle: { marginRight: 10 }
          }}
          title="Login with Instagram"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.palette.grey5
          }}
          onPress={this.onClickInstagram}
          TouchableComponent={TouchableOpacity}
        />
        <InstagramLogin
          containerStyle={{ backgroundColor: this.props.customTheme.overlays[0] }}
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
        <Text style={{
          color: this.props.customTheme.palette.grey2,
          fontSize: 14,
          fontFamily: 'Roboto',
          marginTop: 20,
          marginBottom: 10
        }}>New to the platform?</Text>
        <Button
          buttonStyle={{
            ...styles.button,
            backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string()
          }}
          title="Create an account"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.palette.secondary
          }}
          onPress={this.onClickSignup}
          TouchableComponent={TouchableOpacity}
        />
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '100%'
  },
  pageDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5
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

const mapDispatchToProps = (dispacth) => ({
  signInWithFacebook: (onError) => dispacth(signInWithFacebook(onError)),
  signInWithInstagram: (token, email, onError) => dispacth(signInWithInstagram(token, email, onError)),
  signInWithInstagramFailure: () => dispacth({ type: types.SIGN_IN_WITH_INSTAGRAM_FAILURE })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

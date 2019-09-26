import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import EmailModal from '../../components/EmailModal';
import { signInWithFacebook, signInWithInstagram } from '../../controllers/auth/actions';
import * as types from '../../controllers/auth/types';

const Color = require('color');

class SignIn extends Component {
  state = {
    modalVisible: false,
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
            color: this.props.customTheme.title,
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
              color: this.props.customTheme.label,
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

  render() {
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
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
            color: this.props.customTheme.buttonTitle,
            containerStyle: { marginRight: 10 }
          }}
          title="Login with Facebook"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.buttonTitle
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
            color: this.props.customTheme.buttonTitle,
            containerStyle: { marginRight: 10 }
          }}
          title="Login with Instagram"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.buttonTitle
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
              modalVisible: true,
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
          color: this.props.customTheme.label,
          fontSize: 14,
          fontFamily: 'Roboto',
          marginTop: 24
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
        <EmailModal
          visible={this.state.modalVisible}
          onAccept={(email) => {
            this.setState({ modalVisible: false });
            this.props.signInWithInstagram(this.state.instagramToken, email, this.props.navigation, (reason) => Alert.alert(reason));
          }}
          onReject={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30
  },
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

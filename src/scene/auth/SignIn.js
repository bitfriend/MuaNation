import React, { Component } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { SwitchActions } from 'react-navigation';
import { connect } from 'react-redux';

import ThemeButton from '../../component/theme/Button';
import EmailModal from '../../component/EmailModal';
import { apiRequest } from '../../controller/api/actions';
import { setLoading, clearLoading } from '../../controller/common/actions';
import { signInWithFacebookSuccess, signInWithFacebookFailure, signInWithInstagram } from '../../controller/auth/actions';
import * as types from '../../controller/auth/types';

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
    this.props.setLoading();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('facebook login cancelled');
          this.props.clearLoading();
          this.props.signInWithFacebookFailure();
          return;
        }
        AccessToken.getCurrentAccessToken().then(
          (result) => {
            console.log('get token successful', result.accessToken);
            const request = new GraphRequest('/me', {
              accessToken: result.accessToken,
              parameters: {
                fields: { string: ['id', 'name', 'email'].join(',') }
              }
            }, (error, res) => {
              if (error) {
                console.log('facebook get info failed', error);
                this.props.clearLoading();
                this.props.signInWithFacebookFailure();
                Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
                return;
              }
              console.log('facebook login successful', res);
              AsyncStorage.getItem('mua_token').then(muaToken => {
                this.props.apiRequest({
                  callback: true,
                  url: '/users/add.json',
                  method: 'POST',
                  data: {
                    type: 'facebook',
                    facebook_id: res.id,
                    email: res.email
                  },
                  onSuccess: (json) => {
                    if (json.message.success) {
                      this.props.signInWithFacebookSuccess({
                        facebook_id: res.id,
                        username: res.name,
                        email: res.email,
                        facebook_token: result.accessToken
                      });
                      this.props.clearLoading();
                      this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'AppTabNav' }));
                    } else {
                      this.props.signInWithFacebookFailure();
                      this.props.clearLoading();
                      Toast.showWithGravity(json.message.msg, Toast.SHORT, Toast.CENTER);
                    }
                  },
                  onFailure: (error) => {
                    this.props.signInWithFacebookFailure();
                    this.props.clearLoading();
                    Toast.showWithGravity(error.message, Toast.SHORT, Toast.CENTER);
                  },
                  label: 'Login'
                });
              }).catch(error => {
                this.props.signInWithFacebookFailure();
                this.props.clearLoading();
                Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
              });
            });
            new GraphRequestManager().addRequest(request).start();
          },
          (reason) => {
            console.log('facebook get token failed', reason);
            this.props.clearLoading();
            this.props.signInWithFacebookFailure();
            Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
          }
        );
      },
      (reason) => {
        console.log('facebook login failed', reason);
        this.props.clearLoading();
        this.props.signInWithFacebookFailure();
        Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
      }
    ).catch(reason => {
      console.log('facebook login failed', reason);
      this.props.clearLoading();
      this.props.signInWithFacebookFailure();
      Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
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
          <View style={styles.where}>
            <Text style={styles.mua}>Mua's</Text>
            <Text style={styles.place}>place for professionals</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Swiper
            dotColor={Color(EStyleSheet.value('$grey0Color')).alpha(0.3).string()}
            dotStyle={styles.pageDot}
            activeDotColor={EStyleSheet.value('$grey0Color')}
            activeDotStyle={styles.pageDot}
            containerStyle={styles.swiperContainer}
            paginationStyle={styles.swiperPagination}
          >
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/image/splash1.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/image/splash2.png')} />
            </View>
            <View>
              <Image resizeMode="contain" style={styles.banner} source={require('../../../asset/image/splash3.png')} />
            </View>
          </Swiper>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderGallery()}
        <ThemeButton
          buttonStyle={styles.button}
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: EStyleSheet.value('20rem'),
            containerStyle: styles.buttonIconContainer
          }}
          title="Login with Facebook"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickFacebook}
        />
        <ThemeButton
          buttonStyle={styles.button}
          icon={{
            name: 'instagram',
            type: 'font-awesome',
            size: EStyleSheet.value('20rem'),
            containerStyle: styles.buttonIconContainer
          }}
          title="Login with Instagram"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickInstagram}
        />
        <InstagramLogin
          containerStyle={styles.instagramContainer}
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
        <Text style={styles.question}>New to the platform?</Text>
        <ThemeButton
          buttonStyle={styles.button}
          title="Create an account"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickSignup}
          isPrimary={false}
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$container',
    alignItems: 'center',
    paddingBottom: '16rem'
  },
  welcome: {
    fontFamily: 'Lato',
    fontSize: '24rem',
    fontWeight: 'bold',
    color: '$title'
  },
  where: {
    margin: '10rem'
  },
  mua: {
    fontFamily: 'Lato',
    fontSize: '38rem',
    fontWeight: 'bold',
    color: '$secondaryColor'
  },
  place: {
    fontFamily: 'Roboto',
    fontSize: '14rem',
    color: '$label'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  pageDot: {
    width: '7rem',
    height: '7rem',
    borderRadius: '3.5rem'
  },
  swiperContainer: { paddingBottom: '16rem' },
  swiperPagination: { bottom: '-8rem' },
  button: {
    width: '254rem',
    height: '48rem',
    borderRadius: '12rem',
    marginTop: '16rem'
  },
  buttonIconContainer: { marginRight: '10rem' },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  },
  instagramContainer: { backgroundColor: '$overlay0Color' },
  question: {
    marginTop: '24rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  }
});

const mapDispatchToProps = (dispacth) => ({
  apiRequest: (params) => dispacth(apiRequest(params)),
  setLoading: () => dispacth(setLoading()),
  clearLoading: () => dispacth(clearLoading()),
  signInWithFacebookSuccess: (payload) => dispacth(signInWithFacebookSuccess(payload)),
  signInWithFacebookFailure: () => dispacth(signInWithFacebookFailure()),
  signInWithInstagram: (token, email, onError) => dispacth(signInWithInstagram(token, email, onError)),
  signInWithInstagramFailure: () => dispacth({ type: types.SIGN_IN_WITH_INSTAGRAM_FAILURE })
});

export default connect(null, mapDispatchToProps)(SignIn);

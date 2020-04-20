import React, { Component } from 'react';
import { Alert, Dimensions, Image, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel, { Pagination } from 'react-native-snap-carousel';
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
import * as types from '../../controller/auth/types';

const windowWidth = Dimensions.get('window').width;

class SignIn extends Component {
  state = {
    activeImage: 0,
    modalVisible: false,
    instagramEmail: ''
  }

  instagramToken = ''

  images = [
    require('../../../asset/image/splash1.png'),
    require('../../../asset/image/splash2.png'),
    require('../../../asset/image/splash3.png')
  ]

  componentDidMount() {
    // CookieManager.clearAll().then((res) => {
    //   console.log('CookieManager.clearAll =>', res);
    // });
  }

  onClickFacebook = () => {
    this.props.setLoading();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(result => {
      if (result.isCancelled) {
        this.props.clearLoading();
        return;
      }
      AccessToken.getCurrentAccessToken().then(result => {
        const request = new GraphRequest('/me', {
          accessToken: result.accessToken,
          parameters: {
            fields: { string: ['id', 'name', 'email'].join(',') }
          }
        }, (error, res) => {
          if (error) {
            this.props.clearLoading();
            Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
            return;
          }
          this.props.apiRequest({
            callback: true,
            url: '/users/add.json',
            method: 'POST',
            data: {
              type: 'facebook',
              facebook_id: res.id,
              email: res.email
            },
            onSuccess: (data) => {
              AsyncStorage.setItem('mua_token', data.token).then(() => {
                this.props.signIn({
                  facebook_id: res.id,
                  username: res.name,
                  email: res.email,
                  facebook_token: result.accessToken
                });
                this.props.clearLoading();
                this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'AppTabNav' }));
              });
            },
            onFailure: (error) => {
              this.props.clearLoading();
              Toast.showWithGravity(error.message, Toast.SHORT, Toast.CENTER);
            },
            label: 'Login'
          });
        });
        new GraphRequestManager().addRequest(request).start();
      }).catch((reason) => {
        this.props.clearLoading();
        Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
      });
    }).catch(reason => {
      this.props.clearLoading();
      Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
    });
  }

  onClickInstagram = () => {
    this.instagramLogin.show();
  }

  signInWithInstagram(token, email) {
    this.props.setLoading();
    this.props.apiRequest({
      callback: true,
      baseURL: 'https://api.instagram.com/v1',
      url: '/users/self/',
      method: 'GET',
      data: {
        access_token: token
      },
      onSuccess: (json) => {
        const userId = json.data.id;
        const userName = json.data.username;
        this.props.apiRequest({
          callback: true,
          url: '/users/token.json',
          method: 'POST',
          data: {
            type: 'instagram',
            instagram_id: userId,
            email
          },
          onSuccess: (json) => {
            if (json.success) {
              this.props.signIn({
                instagram_id: userId,
                username: userName,
                email,
                instagram_token: token
              });
              this.props.clearLoading();
              this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: 'AppTabNav' }));
            } else {
              this.props.clearLoading();
              Toast.showWithGravity(json.data.message, Toast.SHORT, Toast.CENTER);
            }
          },
          onFailure: (reason) => {
            this.props.clearLoading();
            Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
          },
          label: 'Login'
        });
      },
      onFailure: (reason) => {
        console.log('get user info failed', reason);
        this.props.clearLoading();
        this.props.signInWithInstagramFailure();
        Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
      },
      label: 'Login'
    });
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
        <View style={{ flex: 1 }}>
          <Carousel
            data={this.images}
            renderItem={({ item, index }) => (
              <Image resizeMode="contain" style={styles.banner} source={item} />
            )}
            sliderWidth={windowWidth}
            itemWidth={EStyleSheet.value('331rem')}
            onSnapToItem={(index) => this.setState({ activeImage: index })}
          />
          <Pagination
            dotsLength={this.images.length}
            activeDotIndex={this.state.activeImage}
            containerStyle={paginationStyles.container}
            dotContainerStyle={paginationStyles.dotContainer}
            dotStyle={paginationStyles.dot}
            inactiveDotStyle={paginationStyles.dot}
            inactiveDotOpacity={0.3}
            inactiveDotScale={1}
          />
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
            this.setState({ modalVisible: true });
            this.instagramToken = token;
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
            this.signInWithInstagram(this.instagramToken, email);
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

const paginationStyles = EStyleSheet.create({
  container: {
    paddingTop: '16rem',
    paddingBottom: '-8rem'
  },
  dotContainer: {
    marginHorizontal: '5rem'
  },
  dot: {
    width: '7rem',
    height: '7rem',
    borderRadius: '3.5rem',
    backgroundColor: '$grey0Color'
  }
});

const mapDispatchToProps = (dispacth) => ({
  apiRequest: (params) => dispacth(apiRequest(params)),
  setLoading: () => dispacth(setLoading()),
  clearLoading: () => dispacth(clearLoading()),
  signIn: (payload) => dispacth({ type: types.SIGN_IN, payload })
});

export default connect(null, mapDispatchToProps)(SignIn);

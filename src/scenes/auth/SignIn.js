import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import ThemeButton from '../../components/theme/Button';
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
  signInWithFacebook: (onError) => dispacth(signInWithFacebook(onError)),
  signInWithInstagram: (token, email, onError) => dispacth(signInWithInstagram(token, email, onError)),
  signInWithInstagramFailure: () => dispacth({ type: types.SIGN_IN_WITH_INSTAGRAM_FAILURE })
});

export default connect(null, mapDispatchToProps)(SignIn);

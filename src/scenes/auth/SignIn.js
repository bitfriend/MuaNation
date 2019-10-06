import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
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
          <Text style={{
            ...styles.welcome,
            color: this.props.customTheme.title
          }}>Welcome to</Text>
          <View style={{ margin: verticalScale(10) }}>
            <Text style={{
              ...styles.mua,
              color: this.props.customTheme.palette.secondary
            }}>Mua's</Text>
            <Text style={{
              ...styles.place,
              color: this.props.customTheme.label
            }}>place for professionals</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Swiper
            dotColor={Color(this.props.customTheme.palette.grey0).alpha(0.3).string()}
            dotStyle={styles.pageDot}
            activeDotColor={this.props.customTheme.palette.grey0}
            activeDotStyle={styles.pageDot}
            containerStyle={{ paddingBottom: verticalScale(16) }}
            paginationStyle={{ bottom: verticalScale(-8) }}
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
        <ThemeButton
          buttonStyle={{ ...styles.button, marginTop: verticalScale(24) }}
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: verticalScale(20),
            containerStyle: { marginRight: verticalScale(10) }
          }}
          title="Login with Facebook"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickFacebook}
        />
        <ThemeButton
          buttonStyle={{ ...styles.button, marginTop: verticalScale(16) }}
          icon={{
            name: 'instagram',
            type: 'font-awesome',
            size: verticalScale(20),
            containerStyle: { marginRight: verticalScale(10) }
          }}
          title="Login with Instagram"
          titleStyle={styles.buttonTitle}
          onPress={this.onClickInstagram}
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
          ...styles.question,
          color: this.props.customTheme.label
        }}>New to the platform?</Text>
        <ThemeButton
          buttonStyle={{ ...styles.button, marginTop: verticalScale(16) }}
          title="Create an account"
          titleStyle={{
            ...styles.buttonTitle,
            color: this.props.customTheme.palette.secondary
          }}
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '16@vs'
  },
  welcome: {
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  },
  mua: {
    fontFamily: 'Lato',
    fontSize: '38@vs',
    fontWeight: 'bold'
  },
  place: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  pageDot: {
    width: '7@vs',
    height: '7@vs',
    borderRadius: '3.5@vs'
  },
  button: {
    width: '254@vs',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16@vs',
    fontWeight: 'bold'
  },
  question: {
    marginTop: '24@vs',
    fontFamily: 'Roboto',
    fontSize: '14@vs'
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

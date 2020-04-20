import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';
import EmailModal from '../../component/EmailModal';
import { apiRequest } from '../../controller/api/actions';
import { setLoading, clearLoading } from '../../controller/common/actions';
import * as types from '../../controller/auth/types';

class CreateAccount extends Component {
  state = {
    role: 'artist',
    modalVisible: false,
    email: '',
    instagramToken: ''
  };

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
              username: res.name,
              email: res.email,
              password: '1234567890',
              facebook_token: result.accessToken,
              role: this.state.role,
              active: 1
            },
            onSuccess: (json) => {
              if (json.message.success) {
                this.props.join();
                AsyncStorage.setItem('mua_token', json.data.token).then(() => {
                  this.props.clearLoading();
                  this.props.navigation.dispatch(StackActions.push({ routeName: 'ImportMedia' }));
                }).catch(error => {
                  this.props.clearLoading();
                  Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
                });
              } else {
                this.props.clearLoading();
                Toast.showWithGravity(json.message.msg, Toast.SHORT, Toast.CENTER);
              }
            },
            onFailure: (error) => {
              this.props.clearLoading();
              Toast.showWithGravity(error.message, Toast.SHORT, Toast.CENTER);
            },
            label: 'Login'
          });
        });
        new GraphRequestManager().addRequest(request).start();
      }).catch(reason => {
        this.props.clearLoading();
        Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
      });
    }).catch(reason => {
      this.props.clearLoading();
      Toast.showWithGravity(reason, Toast.SHORT, Toast.CENTER);
    });
  }

  onClickInstagram = () => {
    // this.instagramLogin.show();
    this.props.navigation.navigate('ImportMedia');
  }

  joinWithInstagram(role, token, email) {
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
        this.props.apiRequest({
          callback: true,
          url: '/users/add.json',
          method: 'POST',
          data: {
            type: 'instagram',
            instagram_id: res.data.id,
            username: res.data.full_name,
            email,
            password: '1234567890',
            instagram_token: token,
            role
          },
          onSuccess: (json) => {
            if (json.message.success) {
              dispatch({ type: types.JOIN_WITH_INSTAGRAM_SUCCESS });
              AsyncStorage.setItem('mua_token', json.data.token).then(() => {
                this.props.clearLoading();
                navigation.dispatch(StackActions.push({ routeName: 'ImportMedia' }));
              }).catch(error => {
                this.props.clearLoading();
                if (onError) {
                  onError(error);
                }
              });
            } else {
              this.props.clearLoading();
              Toast.showWithGravity(error.message.msg, Toast.SHORT, Toast.CENTER);
            }
          },
          onFailure: (error) => {
            this.props.clearLoading();
            Toast.showWithGravity(error.message, Toast.SHORT, Toast.CENTER);
          }
        });
      },
      onFailure: (error) => {
        this.props.clearLoading();
        Toast.showWithGravity(error, Toast.SHORT, Toast.CENTER);
      },
      label: 'Join'
    });
  }

  renderItem = ({ checked, title, description, onPress }) => (
    <TouchableOpacity
      style={{
        ...styles.card,
        borderColor: EStyleSheet.value(checked ? '$secondaryColor' : '$grey3Color'),
        ...this.props.appTheme.styles.shadow3
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{
          ...styles.caption,
          color: EStyleSheet.value(checked ? '$secondaryColor' : '$grey0Color')
        }}>{title}</Text>
        {checked ? (
          <Icon type="material" name="radio-button-checked" size={EStyleSheet.value('20rem')} color={EStyleSheet.value('$secondaryColor')} />
        ) : (
          <Icon type="material" name="radio-button-unchecked" size={EStyleSheet.value('20rem')} color={EStyleSheet.value('$label')} />
        )}
      </View>
      <Text style={styles.overview}>{description}</Text>
    </TouchableOpacity>
  )

  render = () => (
    <View style={styles.container}>
      <SceneHeader />
      <View style={styles.body}>
        <Text style={styles.titleText}>Create an account</Text>
        <Text style={styles.smallText}>Please select how do you want to use the app</Text>
        <View style={{ flex: 1 }}>
          {this.renderItem({
            checked: this.state.role === 'artist',
            title: 'As an Artist',
            description: "I'll showcase and sell my services on the platform",
            onPress: () => this.setState({ role: 'artist' })
          })}
          {this.renderItem({
            checked: this.state.role === 'client',
            title: 'As a Client',
            description: "I'll find and book services from the best artists around",
            onPress: () => this.setState({ role: 'client' })
          })}
        </View>
        <View style={{ alignItems: 'center' }}>
          <ThemeButton
            buttonStyle={styles.button}
            icon={{
              name: 'facebook',
              type: 'font-awesome',
              size: EStyleSheet.value('20rem'),
              containerStyle: styles.buttonIcon
            }}
            title="Join with Facebook"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickFacebook}
          />
          <ThemeButton
            buttonStyle={{ ...styles.button, marginTop: EStyleSheet.value('16rem') }}
            icon={{
              name: 'instagram',
              type: 'font-awesome',
              size: EStyleSheet.value('20rem'),
              containerStyle: styles.buttonIcon
            }}
            title="Join with Instagram"
            titleStyle={styles.buttonTitle}
            onPress={this.onClickInstagram}
          />
          <InstagramLogin
            containerStyle={styles.instagram}
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
              this.props.joinWithInstagramFailure();
              Alert.alert(reason);
            }}
          />
        </View>
      </View>
      <EmailModal
        visible={this.state.modalVisible}
        onAccept={(email) => {
          this.setState({ modalVisible: false });
          this.joinWithInstagram(this.state.role, this.state.instagramToken, email);
        }}
        onReject={() => this.setState({ modalVisible: false })}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '16rem',
    backgroundColor: '$container'
  },
  body: {
    flex: 1,
    marginHorizontal: '60rem'
  },
  titleText: {
    color: '$title',
    fontFamily: 'Roboto',
    fontSize: '24rem',
    fontWeight: 'bold'
  },
  smallText: {
    marginTop: '16rem',
    marginBottom: '28rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  card: {
    width: '100%',
    marginVertical: '10rem',
    padding: '24rem',
    borderWidth: '1rem',
    borderRadius: '12rem',
    backgroundColor: '$card'
  },
  caption: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  },
  overview: {
    marginTop: '8rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  button: {
    width: '254rem',
    height: '48rem',
    borderRadius: '12rem'
  },
  buttonIcon: {
    marginRight: '10rem'
  },
  buttonTitle: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  },
  instagram: {
    backgroundColor: '$overlay0Color'
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  appTheme: theme
});

const mapDispatchToProps = (dispacth) => ({
  apiRequest: (params) => dispacth(apiRequest(params)),
  setLoading: () => dispacth(setLoading()),
  clearLoading: () => dispacth(clearLoading()),
  join: () => dispacth({ type: types.JOIN })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

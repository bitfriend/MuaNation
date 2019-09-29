import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';
import EmailModal from '../../components/EmailModal';
import { joinWithFacebook, joinWithInstagram } from '../../controllers/auth/actions';

const Color = require('color');

class CreateAccount extends Component {
  state = {
    role: 'artist',
    modalVisible: false,
    email: '',
    instagramToken: ''
  };

  onClickFacebook = () => {
    this.props.joinWithFacebook(this.state.role, this.props.navigation, (msg) => Alert.alert(msg));
  }

  onClickInstagram = () => {
    // this.instagramLogin.show();
    this.props.navigation.navigate('ImportMedia');
  }

  renderItem({ checked, title, description, onPress }) {
    return (
      <TouchableOpacity
        style={{
          ...styles.card,
          backgroundColor: this.props.customTheme.card,
          borderColor: checked ? this.props.customTheme.palette.secondary : this.props.customTheme.palette.grey3,
          ...this.props.customTheme.shadows[2]
        }}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Text style={{
            ...styles.caption,
            color: checked ? this.props.customTheme.palette.secondary : this.props.customTheme.palette.grey0
          }}>{title}</Text>
          {checked ? (
            <Icon type="material" name="radio-button-checked" size={20} color={this.props.customTheme.palette.secondary} />
          ) : (
            <Icon type="material" name="radio-button-unchecked" size={20} color={this.props.customTheme.label} />
          )}
        </View>
        <Text style={{
          ...styles.overview,
          color: this.props.customTheme.label
        }}>{description}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.props.customTheme.container
      }}>
        <SceneHeader />
        <View style={{ flex: 1, marginHorizontal: 50 }}>
          <Text style={{
            ...styles.titleText,
            color: this.props.customTheme.title
          }}>Create an account</Text>
          <Text style={{
            ...styles.smallText,
            color: this.props.customTheme.label
          }}>Please select how do you want to use the app</Text>
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
                size: 20,
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Facebook"
              titleStyle={styles.buttonTitle}
              onPress={this.onClickFacebook}
            />
            <ThemeButton
              buttonStyle={styles.button}
              icon={{
                name: 'instagram',
                type: 'font-awesome',
                size: 20,
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Instagram"
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
            this.props.joinWithInstagram(this.state.role, this.state.instagramToken, email, this.props.navigation, (reason) => Alert.alert(reason));
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
    paddingBottom: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
  },
  card: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 12
  },
  caption: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  overview: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
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
  joinWithFacebook: (role, onError) => dispacth(joinWithFacebook(role, onError)),
  joinWithInstagram: (role, token, email, onError) => dispacth(joinWithInstagram(role, token, email, onError)),
  joinWithInstagramFailure: () => dispacth({ type: types.JOIN_WITH_INSTAGRAM_FAILURE })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

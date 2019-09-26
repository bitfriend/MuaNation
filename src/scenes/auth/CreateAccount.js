import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
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
    this.instagramLogin.show();
  }

  renderItem({ checked, title, description, onPress }) {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginVertical: 10,
          backgroundColor: this.props.customTheme.palette.grey5,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: checked ? this.props.customTheme.palette.secondary : this.props.customTheme.palette.grey3,
          ...this.props.customTheme.shadows[2]
        }}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Text style={{
            flex: 1,
            color: checked ? this.props.customTheme.palette.secondary : this.props.customTheme.palette.grey0,
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Roboto'
          }}>{title}</Text>
          {checked ? (
            <Icon type="material" name="radio-button-checked" size={20} color={this.props.customTheme.palette.secondary} />
          ) : (
            <Icon type="material" name="radio-button-unchecked" size={20} color={this.props.customTheme.palette.secondary} />
          )}
        </View>
        <Text style={{
          color: this.props.customTheme.palette.grey2,
          fontSize: 14,
          fontFamily: 'Roboto',
          marginTop: 20,
          marginBottom: 10
        }}>{description}</Text>
      </TouchableOpacity>
    );
  }

  renderModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
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
              onChangeText={(email) => this.setState({ email })}
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
                  this.setState({ modalVisible: false });
                  this.props.joinWithInstagram(this.state.role, this.state.instagramToken, this.state.email, this.props.navigation, (reason) => Alert.alert(reason));
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
                onPress={() => this.setState({ modalVisible: false })}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 30, backgroundColor: this.props.customTheme.palette.grey5 }}>
        <SceneHeader />
        <View style={{ flex: 1, marginHorizontal: 50 }}>
          <Text style={{
            color: this.props.customTheme.palette.grey0,
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Roboto'
          }}>Create an account</Text>
          <Text style={{
            color: this.props.customTheme.palette.grey2,
            fontSize: 14,
            fontFamily: 'Roboto',
            marginTop: 20,
            marginBottom: 10
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
              title="Join with Facebook"
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
              title="Join with Instagram"
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
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

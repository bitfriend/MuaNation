import React, { Component } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import styles from './styles';
import { joinWithFacebook, joinWithInstagram } from '../../controllers/auth/actions';

class CreateAccount extends Component {
  state = {
    role: 'artist',
    modalVisible: false,
    email: '',
    instagramToken: ''
  };

  onClickFacebook = () => {
    this.props.joinWithFacebook(this.state.role, (msg) => Alert.alert(msg));
  }

  onClickInstagram = () => {
    this.instagramLogin.show();
  }

  renderItem({ checked, title, description, onPress }) {
    return (
      <TouchableOpacity
        style={[customStyles.selectItem, checked ? { borderColor: '#ef3475' } : { borderColor: '#97898e' }]}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Text style={[styles.middleText, customStyles.middleText, checked ? { color: '#ef3475' } : {}]}>{title}</Text>
          {checked ? (
            <Icon type="material" name="radio-button-checked" size={20} color="#ef3475" />
          ) : (
            <Icon type="material" name="radio-button-unchecked" size={20} color="black" />
          )}
        </View>
        <Text style={styles.smallText}>{description}</Text>
      </TouchableOpacity>
    );
  }

  renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            padding: 5
          }}>
            <Text style={{
              fontSize: 16,
              padding: 10
            }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              leftIcon={{
                name: 'envelope',
                type: 'font-awesome',
                size: 20,
                color: '#97898e'
              }}
              placeholder="Email"
              placeholderTextColor="#97898e"
              onChangeText={(email) => this.setState({ email })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={{
                  flex: 1,
                  padding: 5
                }}
                title="OK"
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.props.joinWithInstagram(this.state.role, this.state.instagramToken, this.state.email, (reason) => Alert.alert(reason));
                }}
              />
              <Button
                containerStyle={{
                  flex: 1,
                  padding: 5
                }}
                title="Cancel"
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
      <View style={styles.container}>
        <SceneHeader />
        <View style={{ flex: 1, marginHorizontal: 50 }}>
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
            <Button
              buttonStyle={styles.loginButton}
              icon={{
                name: 'facebook',
                type: 'font-awesome',
                size: 20,
                color: 'white',
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Facebook"
              titleStyle={styles.socialText}
              onPress={this.onClickFacebook}
              TouchableComponent={TouchableOpacity}
            />
            <Button
              buttonStyle={styles.loginButton}
              icon={{
                name: 'instagram',
                type: 'font-awesome',
                size: 20,
                color: 'white',
                containerStyle: { marginRight: 10 }
              }}
              title="Join with Instagram"
              titleStyle={styles.socialText}
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

const customStyles = StyleSheet.create({
  middleText: {
    marginHorizontal: 0,
    flex: 1
  },
  selectItem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 20
  }
});

const mapDispatchToProps = (dispacth) => ({
  joinWithFacebook: (role, onError) => dispacth(joinWithFacebook(role, onError)),
  joinWithInstagram: (role, token, email, onError) => dispacth(joinWithInstagram(role, token, email, onError)),
  joinWithInstagramFailure: () => dispacth({ type: types.JOIN_WITH_INSTAGRAM_FAILURE })
});

export default connect(null, mapDispatchToProps)(CreateAccount);

import React, { Component } from 'react';
import { Alert, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import colors from '../../components/theme/colors';
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
        style={[styles.selectItem, checked ? { borderColor: colors.mulberry } : { borderColor: colors.gainsboro }]}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Text style={[styles.middleText, checked ? { color: colors.mulberry } : { color: colors.smokyBlack }]}>{title}</Text>
          {checked ? (
            <Icon type="material" name="radio-button-checked" size={20} color={colors.mulberry} />
          ) : (
            <Icon type="material" name="radio-button-unchecked" size={20} color={colors.smokyBlack} />
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
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', marginHorizontal: 10, padding: 5 }}>
            <Text style={{ fontSize: 16, padding: 10 }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              leftIcon={{ name: 'envelope', type: 'font-awesome', size: 20, color: colors.taupe }}
              placeholder="Email"
              placeholderTextColor={colors.taupeGray}
              onChangeText={(email) => this.setState({ email })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{ backgroundColor: colors.mulberry, borderRadius: 12 }}
                title="OK"
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.props.joinWithInstagram(this.state.role, this.state.instagramToken, this.state.email, (reason) => Alert.alert(reason));
                }}
              />
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{
                  backgroundColor: colors.mulberry + '19', // alpha 10%
                  borderRadius: 12
                }}
                title="Cancel"
                titleStyle={{ color: colors.mulberry }}
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
      <View style={{ flex: 1, paddingBottom: 30 }}>
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
              buttonStyle={styles.button}
              icon={{ name: 'facebook', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
              title="Join with Facebook"
              titleStyle={styles.buttonTitle}
              onPress={this.onClickFacebook}
              TouchableComponent={TouchableOpacity}
            />
            <Button
              buttonStyle={styles.button}
              icon={{ name: 'instagram', type: 'font-awesome', size: 20, color: 'white', containerStyle: { marginRight: 10 } }}
              title="Join with Instagram"
              titleStyle={styles.buttonTitle}
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

const styles = StyleSheet.create({
  titleText: {
    color: colors.smokyBlack,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  middleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    flex: 1
  },
  smallText: {
    color: colors.taupeGray,
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 10
  },
  selectItem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 20,
    ...Platform.select({
      ios: {
        shadowRadius: 16,
        shadowColor: colors.sealBrown,
        shadowOpacity: 1,
        shadowOffset: { width: 2, height: 12 }
      },
      android: {
        elevation: 12
      }
    })
  },
  button: {
    width: 254,
    height: 48,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: colors.mulberry,
    ...Platform.select({
      ios: {
        shadowRadius: 16,
        shadowColor: colors.roseBonbon,
        shadowOpacity: 1,
        shadowOffset: { width: 1, height: 6 }
      },
      android: {
        elevation: 6
      }
    })
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});

const mapDispatchToProps = (dispacth) => ({
  joinWithFacebook: (role, onError) => dispacth(joinWithFacebook(role, onError)),
  joinWithInstagram: (role, token, email, onError) => dispacth(joinWithInstagram(role, token, email, onError)),
  joinWithInstagramFailure: () => dispacth({ type: types.JOIN_WITH_INSTAGRAM_FAILURE })
});

export default connect(null, mapDispatchToProps)(CreateAccount);

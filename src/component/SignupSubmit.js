
import React, { Component } from 'react';

import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { signUp } from '../controller/auth/actions';

import AsyncStorage from '@react-native-community/async-storage';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 200;

class SignupSubmit extends Component {
  state = {
    isLoading: false
  }

  buttonAnimated = new Animated.Value(0)

  growAnimated = new Animated.Value(0)

  componentWillReceiveProps(nextProps) {

  }

  Do = () => {

    this.setState({isLoading: false});
    this.buttonAnimated.setValue(0);
    this.growAnimated.setValue(0);

    //this.props.callback();
  }

  onPress = () => {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    //this.props.onLogin(this.props.userName, this.props.userPassword);
    this.props.onSignup('james1', 'me@you.com', 'testuserpass');

    // setTimeout(async () => {
    //   this.onGrow();

    //   try {
    //     //await AsyncStorage.setItem('userToken', '0000');

    //     setTimeout(this.Do, 300);
    //   }
    //   catch (e) {
    //     this.setState({isLoading: false});
    //   }

    // }, 2000);
  }

  onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, 40],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={require('../../asset/image/loading.gif')} style={styles.image} />
            ) : (
              <Text style={styles.text}>SIGNUP</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: 40,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: 40,
    width: 40,
    marginTop: -40,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});

const mapDispatchToProps = dispatch => ({
  onSignup: (username, email, password) => {
    dispatch(signUp(username, email, password));
  },
});

export default connect(null, mapDispatchToProps)(SignupSubmit);

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class FloatingBackButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{
        position: 'absolute',
        top: 48,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1
      }}>
        <Icon name="arrow-back" type="ionicons" size={20} color="#17050b" />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FloatingBackButton);

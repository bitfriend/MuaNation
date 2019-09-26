import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Color = require('color');

class EmailModal extends Component {
  state = {
    email: ''
  }

  render() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.visible}>
        <View style={{
          ...styles.overlay,
          backgroundColor: this.props.customTheme.overlays[0]
        }}>
          <View style={{
            ...styles.container,
            backgroundColor: this.props.customTheme.container
          }}>
            <Text style={{
              ...styles.caption,
              color: this.props.customTheme.label
            }}>Please enter the email for Instagram</Text>
            <Input
              containerStyle={{ padding: 5 }}
              inputContainerStyle={{ backgroundColor: this.props.customTheme.inputContainer }}
              leftIcon={{ name: 'envelope', type: 'font-awesome', size: 20, color: this.props.customTheme.input }}
              placeholder="Email"
              placeholderTextColor={this.props.customTheme.placeholder}
              inputStyle={{ color: this.props.customTheme.input }}
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
                titleStyle={{ color: this.props.customTheme.buttonTitle }}
                onPress={() => this.props.onAccept && this.props.onAccept(this.state.email)}
              />
              <Button
                containerStyle={{ flex: 1, padding: 5 }}
                buttonStyle={{
                  backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string(),
                  borderRadius: 12
                }}
                title="Cancel"
                titleStyle={{ color: this.props.customTheme.palette.secondary }}
                onPress={() => this.props.onReject && this.props.onReject()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 5
  },
  caption: {
    fontSize: 16,
    padding: 10
  }
});

EmailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
};

EmailModal.defaultProps = {
  visible: false
};

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(EmailModal);

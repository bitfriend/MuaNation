import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
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
              containerStyle={styles.inputContainer}
              inputContainerStyle={{ backgroundColor: this.props.customTheme.inputContainer }}
              leftIcon={{
                name: 'envelope',
                type: 'font-awesome',
                size: verticalScale(20),
                color: this.props.customTheme.input
              }}
              placeholder="Email"
              placeholderTextColor={this.props.customTheme.placeholder}
              inputStyle={{ color: this.props.customTheme.input }}
              onChangeText={(email) => this.setState({ email })}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                containerStyle={buttonStyles.container}
                buttonStyle={{
                  ...buttonStyles.button,
                  backgroundColor: this.props.customTheme.palette.secondary
                }}
                title="OK"
                titleStyle={{
                  ...buttonStyles.title,
                  color: this.props.customTheme.buttonTitle
                }}
                onPress={() => this.props.onAccept && this.props.onAccept(this.state.email)}
              />
              <Button
                containerStyle={buttonStyles.container}
                buttonStyle={{
                  ...buttonStyles.button,
                  backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string()
                }}
                title="Cancel"
                titleStyle={{
                  ...buttonStyles.title,
                  color: this.props.customTheme.palette.secondary
                }}
                onPress={() => this.props.onReject && this.props.onReject()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    borderRadius: '12@vs',
    marginHorizontal: '10@vs',
    padding: '5@vs'
  },
  caption: {
    padding: '10@vs',
    fontFamily: 'Roboto',
    fontSize: '16@vs'
  },
  inputContainer: {
    padding: '5@vs'
  }
});

const buttonStyles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '5@vs'
  },
  button: {
    borderRadius: '12@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '14@vs'
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

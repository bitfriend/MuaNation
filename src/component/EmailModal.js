import React, { PureComponent } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

const Color = require('color');

export default class EmailModal extends PureComponent {
  state = {
    email: ''
  }

  render = () => (
    <Modal animationType="fade" transparent={true} visible={this.props.visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.caption}>Please enter the email for Instagram</Text>
          <Input
            containerStyle={inputStyles.container}
            inputContainerStyle={inputStyles.inputContainer}
            leftIcon={{
              name: 'envelope',
              type: 'font-awesome',
              size: EStyleSheet.value('20rem'),
              color: EStyleSheet.value('$input')
            }}
            placeholder="Email"
            placeholderTextColor={EStyleSheet.value('$placeholder')}
            inputStyle={inputStyles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button
              containerStyle={buttonStyles.container}
              buttonStyle={buttonStyles.primaryButton}
              title="OK"
              titleStyle={buttonStyles.primaryTitle}
              onPress={() => this.props.onAccept && this.props.onAccept(this.state.email)}
            />
            <Button
              containerStyle={buttonStyles.container}
              buttonStyle={buttonStyles.secondaryButton}
              title="Cancel"
              titleStyle={buttonStyles.secondaryTitle}
              onPress={() => this.props.onReject && this.props.onReject()}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = EStyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$overlay0Color'
  },
  container: {
    borderRadius: '12rem',
    marginHorizontal: '10rem',
    padding: '5rem',
    backgroundColor: '$container'
  },
  caption: {
    padding: '10rem',
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '16rem'
  }
});

const inputStyles = EStyleSheet.create({
  container: {
    padding: '5rem'
  },
  inputContainer: {
    backgroundColor: '$inputContainer'
  },
  input: {
    color: '$input'
  }
});

const buttonStyles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: '5rem'
  },
  primaryButton: {
    borderRadius: '12rem',
    backgroundColor: '$secondaryColor'
  },
  secondaryButton: {
    borderRadius: '12rem',
    backgroundColor: Color(EStyleSheet.value('$secondaryColor')).alpha(0.1).string()
  },
  primaryTitle: {
    color: '$buttonTitle',
    fontFamily: 'Roboto',
    fontSize: '14rem'
  },
  secondaryTitle: {
    color: '$secondaryColor',
    fontFamily: 'Roboto',
    fontSize: '14rem'
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

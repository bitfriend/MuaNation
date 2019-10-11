import React, { Component } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';
import ThemeButton from '../../components/theme/Button';

class EditInfo extends Component {
  state = {
    description: 'Being lucky in life is the result of putting yourself into action for good luck to happen to you. You’ve probably heard the statement “The harder I work the luckier I get”. Another way of putting it is “Whatever you are ready for is ready for you.”'
  }

  onSave = () => {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="Edit info" />
        <TextInput
          multiline={true}
          placeholder="Type description"
          placeholderTextColor={this.props.customTheme.label}
          style={{
            ...styles.description,
            backgroundColor: this.props.customTheme.palette.grey3,
            color: this.props.customTheme.title
          }}
          onChangeText={(description) => this.setState({ description })}
        >{this.state.description}</TextInput>
        <View style={{ flex: 1 }} />
        <View style={buttonStyles.container}>
          <ThemeButton
            buttonStyle={buttonStyles.button}
            title="Save"
            titleStyle={buttonStyles.title}
            onPress={this.onSave}
            isPrimary={false}
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  description: {
    flex: 1,
    height: '200@vs',
    marginTop: '24@vs',
    marginHorizontal: '16@vs',
    borderRadius: '12@vs',
    padding: '16@vs',
    textAlignVertical: 'top'
  }
});

const buttonStyles = ScaledSheet.create({
  container: {
    padding: '16@vs'
  },
  button: {
    width: '100%',
    height: '48@vs',
    borderRadius: '12@vs'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '16@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(EditInfo);
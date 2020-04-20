import React, { PureComponent } from 'react';
import { TextInput, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SceneHeader from '../../component/SceneHeader';
import ThemeButton from '../../component/theme/Button';

export default class EditInfo extends PureComponent {
  state = {
    description: 'Being lucky in life is the result of putting yourself into action for good luck to happen to you. You’ve probably heard the statement “The harder I work the luckier I get”. Another way of putting it is “Whatever you are ready for is ready for you.”'
  }

  onSave = () => {}

  render = () => (
    <View style={{ flex: 1 }}>
      <SceneHeader title="Edit info" />
      <TextInput
        multiline={true}
        placeholder="Type description"
        placeholderTextColor={EStyleSheet.value('$label')}
        style={styles.description}
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
  )
}

const styles = EStyleSheet.create({
  description: {
    flex: 1,
    height: '200rem',
    marginTop: '24rem',
    marginHorizontal: '16rem',
    borderRadius: '12rem',
    padding: '16rem',
    backgroundColor: '$grey3Color',
    color: '$title',
    textAlignVertical: 'top'
  }
});

const buttonStyles = EStyleSheet.create({
  container: {
    padding: '16rem'
  },
  button: {
    width: '100%',
    height: '48rem',
    borderRadius: '12rem'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '16rem',
    fontWeight: 'bold'
  }
});

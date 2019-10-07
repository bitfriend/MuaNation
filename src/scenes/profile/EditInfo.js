import React, { Component } from 'react';
import { View } from 'react-native';

import SceneHeader from '../../components/SceneHeader';

export default class EditInfo extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="Edit info" />
      </View>
    );
  }
}

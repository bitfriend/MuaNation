import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import SceneHeader from '../../component/SceneHeader';

export default class Settings extends PureComponent {
  render = () => (
    <View style={{ flex: 1 }}>
      <SceneHeader title="Settings" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Profile</Text>
          <Icon
            type="font-awesome"
            name="chevron-right"
            size={EStyleSheet.value('20rem')}
            color={EStyleSheet.value('$title')}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '16rem'
  },
  item: {
    flexDirection: 'row',
    borderBottomColor: '$grey3Color',
    borderBottomWidth: '1rem',
    paddingVertical: '20rem'
  },
  itemTitle: {
    flex: 1,
    color: '$label',
    fontFamily: 'Roboto',
    fontSize: '18rem',
    fontWeight: 'bold'
  }
});

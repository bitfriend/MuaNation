import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { connect } from 'react-redux';

import SceneHeader from '../../components/SceneHeader';

class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneHeader title="Settings" />
        <View style={styles.container}>
          <TouchableOpacity style={{
            ...styles.item,
            borderBottomWidth: verticalScale(1),
            borderBottomColor: this.props.customTheme.palette.grey3
          }}>
            <Text style={{
              ...styles.itemTitle,
              color: this.props.customTheme.title
            }}>Profile</Text>
            <Icon
              type="font-awesome"
              name="chevron-right"
              size={verticalScale(20)}
              color={this.props.customTheme.title}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={{
            ...styles.item,
            borderBottomWidth: verticalScale(1),
            borderBottomColor: this.props.customTheme.palette.grey3
          }}>
            <Text style={{
              ...styles.itemTitle,
              color: this.props.customTheme.label
            }}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={{
              ...styles.itemTitle,
              color: this.props.customTheme.label
            }}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '16@vs'
  },
  item: {
    flexDirection: 'row',
    paddingVertical: '20@vs'
  },
  itemTitle: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(Settings);

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import colors from './theme/colors';

export default class TabBar extends Component {
  onPress(routeName) {
    this.props.navigation.navigate(routeName);
  }

  renderItem(focused, label) {
    const tabStyle = {
      ...this.props.tabStyle,
      flexDirection: 'row'
    };
    if (!label) {
      tabStyle.padding = 4;
    }
    const normalLabelStyle = {
      ...this.props.labelStyle,
      ...styles.tabItem,
      color: focused ? this.props.activeTintColor : this.props.inactiveTintColor
    };
    const focusedLabelStyle = {
      ...normalLabelStyle,
      textDecorationLine: 'underline'
    };
    return (
      <View style={tabStyle}>
        <View style={{ marginHorizontal: 16, flexDirection: 'row' }}>
          <Text style={focused ? focusedLabelStyle: normalLabelStyle}>{label.charAt(0).toUpperCase()}</Text>
          <Text style={normalLabelStyle}>{label.substring(1)}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigationState, getLabelText } = this.props;
    const { routes } = navigationState;
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
        {routes.map((route, index) => (
          <TouchableOpacity key={index} onPress={() => this.onPress(route.routeName)}>
            {this.renderItem(index === navigationState.index, getLabelText({ route }))}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

TabBar.propTypes = {
  style: PropTypes.object,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  tabStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  upperCaseLabel: PropTypes.bool,
  indicatorStyle: PropTypes.object
}

TabBar.defaultProps = {
  activeTintColor: colors.mulberry,
  inactiveTintColor: colors.taupe,
  upperCaseLabel: false
}

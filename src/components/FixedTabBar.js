import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import PropTypes from 'prop-types';

export default class FixedTabBar extends Component {
  onPress(routeName) {
    this.props.navigation.navigate(routeName);
  }

  renderItem(focused, label) {
    const tabStyle = {
      ...this.props.tabStyle,
      flexDirection: 'row'
    };
    if (!label) {
      tabStyle.padding = verticalScale(4);
    }
    const normalLabelStyle = {
      ...styles.tabItem,
      ...this.props.labelStyle,
      color: focused ? this.props.activeTintColor : this.props.inactiveTintColor
    };
    const focusedLabelStyle = {
      ...normalLabelStyle,
      borderBottomColor: this.props.activeTintColor,
      borderBottomWidth: verticalScale(2)
    };
    return (
      <View style={tabStyle}>
        <View style={{ marginHorizontal: verticalScale(16), flexDirection: 'row' }}>
          <Text style={focused ? focusedLabelStyle : normalLabelStyle}>{label.charAt(0).toUpperCase()}</Text>
          <Text style={normalLabelStyle}>{label.substring(1)}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigationState, getLabelText, style } = this.props;
    const { routes } = navigationState;
    return (
      <View style={{ ...style, flexDirection: 'row', paddingVertical: verticalScale(8) }}>
        {routes.map((route, index) => (
          <TouchableOpacity key={index} onPress={() => this.onPress(route.routeName)}>
            {this.renderItem(index === navigationState.index, getLabelText({ route }))}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  tabItem: {
    fontFamily: 'Lato',
    fontSize: '24@vs',
    fontWeight: 'bold'
  }
});

FixedTabBar.propTypes = {
  style: PropTypes.object,
  activeTintColor: PropTypes.string.isRequired,
  inactiveTintColor: PropTypes.string.isRequired,
  tabStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  upperCaseLabel: PropTypes.bool,
  indicatorStyle: PropTypes.object
}

FixedTabBar.defaultProps = {
  upperCaseLabel: false
}

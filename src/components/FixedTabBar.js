import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const { navigationState, getLabelText, style } = this.props;
    const { routes } = navigationState;
    return (
      <View style={{ ...style, flexDirection: 'row', paddingVertical: 8 }}>
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

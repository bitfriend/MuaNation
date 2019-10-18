import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
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
      tabStyle.padding = EStyleSheet.value('4rem');
    }
    const normalLabelStyle = {
      ...styles.label,
      ...this.props.labelStyle,
      color: focused ? this.props.activeTintColor : this.props.inactiveTintColor
    };
    const focusedLabelStyle = EStyleSheet.create({
      ...normalLabelStyle,
      borderBottomColor: this.props.activeTintColor,
      borderBottomWidth: '2rem'
    });
    return (
      <View style={tabStyle}>
        <View style={styles.tabItem}>
          <Text style={focused ? focusedLabelStyle : normalLabelStyle}>{label.charAt(0).toUpperCase()}</Text>
          <Text style={normalLabelStyle}>{label.substring(1)}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigationState, getLabelText, style } = this.props;
    const { routes } = navigationState;
    const barStyle = EStyleSheet.create({
      ...style,
      flexDirection: 'row',
      paddingVertical: '8rem'
    });
    return (
      <View style={barStyle}>
        {routes.map((route, index) => (
          <TouchableOpacity key={index} onPress={() => this.onPress(route.routeName)}>
            {this.renderItem(index === navigationState.index, getLabelText({ route }))}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  tabItem: {
    flexDirection: 'row',
    marginHorizontal: '16rem'
  },
  label: {
    fontFamily: 'Lato',
    fontSize: '24rem',
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

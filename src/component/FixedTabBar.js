import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

export default class FixedTabBar extends PureComponent {
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
    const labelStyle = {
      ...styles.label,
      ...this.props.labelStyle,
      color: focused ? this.props.activeTintColor : this.props.inactiveTintColor
    };
    const wrapperStyle = focused ? {
      borderBottomColor: this.props.activeTintColor,
      borderBottomWidth: EStyleSheet.value('2rem')
    } : undefined;
    return (
      <View style={tabStyle}>
        <View style={styles.tabItem}>
          <View style={wrapperStyle}>
            <Text style={labelStyle}>{label.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={labelStyle}>{label.substr(1)}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigationState, getLabelText, style } = this.props;
    const { routes } = navigationState;
    return (
      <View style={[style, styles.container]}>
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
  container: {
    '@media ios': {
      marginTop: getStatusBarHeight()
    },
    flexDirection: 'row',
    paddingVertical: '8rem'
  },
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

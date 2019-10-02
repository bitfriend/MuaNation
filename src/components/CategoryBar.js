import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import PropTypes from 'prop-types';

export default class CategoryBar extends PureComponent {
  state = {
    activeIndex: 0
  };

  onPress(activeIndex, value) {
    this.setState({ activeIndex });
    this.props.onSelect(value);
  }

  render() {
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.tabs.map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => this.onPress(index, tab.value)}>
              <Text style={[customStyles.tabItem, index === this.state.activeIndex ? {
                borderBottomColor: this.props.underlineColor,
                borderBottomWidth: verticalScale(2),
                color: this.props.activeTabColor,
                fontWeight: 'bold'
              } : {
                color: this.props.inactiveTabColor
              }]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const customStyles = ScaledSheet.create({
  tabItem: {
    fontFamily: 'Roboto',
    fontSize: '18@vs',
    marginHorizontal: '16@vs',
    paddingVertical: '16@vs',
    textTransform: 'capitalize'
  }
});

CategoryBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  activeTabColor: PropTypes.string,
  inactiveTabColor: PropTypes.string,
  underlineColor: PropTypes.string,
  onSelect: PropTypes.func
}

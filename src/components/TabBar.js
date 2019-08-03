import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

export default class TabBar extends Component {
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

const customStyles = StyleSheet.create({
  tabItem: {
    fontFamily: 'Roboto',
    fontSize: 18,
    marginHorizontal: 16,
    textTransform: 'capitalize'
  }
});

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  activeTabColor: PropTypes.string,
  inactiveTabColor: PropTypes.string,
  underlineColor: PropTypes.string,
  onSelect: PropTypes.func
}

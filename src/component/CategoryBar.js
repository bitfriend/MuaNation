import React, { PureComponent } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

export default class CategoryBar extends PureComponent {
  state = {
    activeIndex: 0
  };

  onPress(activeIndex, value) {
    this.setState({ activeIndex });
    this.props.onSelect(value);
  }

  render = () => (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {this.props.tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => this.onPress(index, tab.value)}>
            <Text style={[styles.tabItem, index === this.state.activeIndex ? {
              ...styles.activeItem,
              borderBottomColor: this.props.underlineColor,
              color: this.props.activeTabColor
            } : {
              color: this.props.inactiveTabColor
            }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = EStyleSheet.create({
  tabItem: {
    fontFamily: 'Roboto',
    fontSize: '18rem',
    marginHorizontal: '16rem',
    paddingVertical: '16rem',
    textTransform: 'capitalize'
  },
  activeItem: {
    borderBottomWidth: '2rem',
    fontWeight: 'bold'
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

import React, { Component, Fragment } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;

export default class SliderMarker extends Component {
  render() {
    return (
      <TouchableHighlight>
        <Fragment>
          <View style={this.props.enabled ? [
            styles.markerStyle,
            this.props.markerStyle,
            this.props.pressed && styles.pressedMarkerStyle,
            this.props.pressed && this.props.pressedMarkerStyle
          ] : [
            styles.markerStyle,
            styles.disabled
          ]} />
          <Text style={[
            styles.valueStyle,
            this.props.pressed && styles.pressedValueStyle
          ]}>{this.props.valuePrefix + this.props.currentValue + this.props.valueSuffix}</Text>
        </Fragment>
      </TouchableHighlight>
    );
  }
}

SliderMarker.propTypes = {
  pressed: PropTypes.bool,
  pressedMarkerStyle: ViewPropTypes.style,
  markerStyle: ViewPropTypes.style,
  enabled: PropTypes.bool,
  currentValue: PropTypes.number,
  valuePrefix: PropTypes.string,
  valueSuffix: PropTypes.string
};

SliderMarker.defaultProps = {
  valuePrefix: '',
  valueSuffix: ''
};

const styles = StyleSheet.create({
  markerStyle: {
    ...Platform.select({
      ios: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.2
      },
      android: {
        height: 12,
        width: 12,
        borderRadius: 12,
        backgroundColor: '#0D8675'
      }
    })
  },
  pressedMarkerStyle: {
    ...Platform.select({
      ios: {},
      android: {
        height: 20,
        width: 20,
        borderRadius: 20
      }
    })
  },
  valueStyle: {
    ...Platform.select({
      ios: {},
      android: {
        top: -20
      }
    }),
    position: 'absolute',
    alignSelf: 'center',
    color: '#4c39e8'
  },
  pressedValueStyle: {
    ...Platform.select({
      ios: {},
      android: {
        top: -16
      }
    })
  },
  disabled: {
    backgroundColor: '#d3d3d3'
  }
});

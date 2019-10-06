import React, { Component, Fragment } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
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

const styles = ScaledSheet.create({
  markerStyle: {
    ...Platform.select({
      ios: {
        height: '20@vs',
        width: '20@vs',
        borderRadius: '10@vs',
        borderWidth: '1@vs',
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: '3@vs'
        },
        shadowRadius: '1@vs',
        shadowOpacity: 0.2
      },
      android: {
        height: '20@vs',
        width: '20@vs',
        borderRadius: '10@vs',
        backgroundColor: '#0d8675'
      }
    })
  },
  pressedMarkerStyle: {
    ...Platform.select({
      ios: {},
      android: {
        height: '20@vs',
        width: '20@vs',
        borderRadius: '20@vs'
      }
    })
  },
  valueStyle: {
    ...Platform.select({
      ios: {},
      android: {
        top: '-20@vs'
      }
    }),
    position: 'absolute',
    alignSelf: 'center',
    color: '#4c39e8',
    fontFamily: 'Roboto',
    fontSize: '14@vs',
    fontWeight: 'bold'
  },
  pressedValueStyle: {
    ...Platform.select({
      ios: {},
      android: {
        top: '-16@vs'
      }
    })
  },
  disabled: {
    backgroundColor: '#d3d3d3'
  }
});

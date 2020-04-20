import React, { PureComponent, Fragment } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;

export default class SliderMarker extends PureComponent {
  render = () => (
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
  )
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

const styles = EStyleSheet.create({
  markerStyle: {
    '@media ios': {
      height: '20rem',
      width: '20rem',
      borderRadius: '10rem',
      borderWidth: '1rem',
      borderColor: '#dddddd',
      backgroundColor: '#ffffff',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: '3rem'
      },
      shadowRadius: '1rem',
      shadowOpacity: 0.2
    },
    '@media android': {
      height: '20rem',
      width: '20rem',
      borderRadius: '10rem',
      backgroundColor: '#0d8675'
    }
  },
  pressedMarkerStyle: {
    '@media android': {
      height: '20rem',
      width: '20rem',
      borderRadius: '20rem'
    }
  },
  valueStyle: {
    '@media android': {
      top: '-20rem'
    },
    position: 'absolute',
    alignSelf: 'center',
    color: '#4c39e8',
    fontFamily: 'Roboto',
    fontSize: '14rem',
    fontWeight: 'bold'
  },
  pressedValueStyle: {
    '@media android': {
      top: '-16rem'
    }
  },
  disabled: {
    backgroundColor: '#d3d3d3'
  }
});

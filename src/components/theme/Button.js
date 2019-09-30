import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Color = require('color');
const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;

class ThemeButton extends Component {
  render() {
    return (
      <View style={this.props.containerStyle}>
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.3} style={[{
          ...this.props.buttonStyle,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }, this.props.isPrimary ? {
          backgroundColor: this.props.customTheme.palette.secondary,
          ...this.props.customTheme.buttonShadow
        } : {
          backgroundColor: Color(this.props.customTheme.palette.secondary).alpha(0.1).string()
        }]}>
          {this.props.icon && !this.props.iconRight && (
            <Icon {...this.props.icon} color={this.props.isPrimary ? this.props.customTheme.buttonTitle : this.props.customTheme.palette.secondary} />
          )}
          {!!this.props.title && (
            <Text style={{
              ...this.props.titleStyle,
              color: this.props.isPrimary ? this.props.customTheme.buttonTitle : this.props.customTheme.palette.secondary
            }}>{this.props.title}</Text>
          )}
          {this.props.icon && this.props.iconRight && (
            <Icon {...this.props.icon} color={this.props.isPrimary ? this.props.customTheme.buttonTitle : this.props.customTheme.palette.secondary} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

ThemeButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  buttonStyle: ViewPropTypes.style,
  icon: PropTypes.object,
  iconRight: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  onPress: PropTypes.func,
  isPrimary: PropTypes.bool
}

ThemeButton.defaultProps = {
  isPrimary: true
}

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(ThemeButton);

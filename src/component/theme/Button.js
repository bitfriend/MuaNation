import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Color = require('color');
const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;

class ThemeButton extends PureComponent {
  render = () => (
    <View style={this.props.containerStyle}>
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.3} style={[{
        ...this.props.buttonStyle,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }, this.props.isPrimary ? {
        backgroundColor: EStyleSheet.value('$secondaryColor'),
        ...this.props.appTheme.styles.buttonShadow
      } : {
        backgroundColor: Color(EStyleSheet.value('$secondaryColor')).alpha(0.1).string()
      }]}>
        {this.props.icon && !this.props.iconRight && (
          <Icon {...this.props.icon} color={EStyleSheet.value(this.props.isPrimary ? '$buttonTitle' : '$secondaryColor')} />
        )}
        {!!this.props.title && (
          <Text style={{
            ...this.props.titleStyle,
            color: EStyleSheet.value(this.props.isPrimary ? '$buttonTitle' : '$secondaryColor')
          }}>{this.props.title}</Text>
        )}
        {this.props.icon && this.props.iconRight && (
          <Icon {...this.props.icon} color={EStyleSheet.value(this.props.isPrimary ? '$buttonTitle' : '$secondaryColor')} />
        )}
      </TouchableOpacity>
    </View>
  )
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
  appTheme: theme
});

export default connect(mapStateToProps)(ThemeButton);

import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

class ThemeStatusBar extends PureComponent {
  render = () => (
    <StatusBar
      backgroundColor={this.props.config.backgroundColor}
      barStyle={this.props.config.barStyle}
      translucent={this.props.config.translucent}
    />
  )
}

const mapStateToProps = ({
  common: { statusBar }
}) => ({
  config: statusBar
});

export default connect(mapStateToProps)(ThemeStatusBar);

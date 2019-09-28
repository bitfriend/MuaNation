import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Bookings extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.customTheme.container }}>
      </View>
    );
  }
}

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default connect(mapStateToProps)(Bookings);

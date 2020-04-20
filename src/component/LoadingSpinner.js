import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

class LoadingSpinner extends Component {
  render() {
    console.log('loading', this.props.loading);
    if (this.props.loading === 0)
      return null;
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color="white" style={{
          transform: [{ scale: 3 }]
        }} />
      </View>
    );
  }
}

const mapStateToProps = ({
  common: { loading }
}) => ({
  loading
});

export default connect(mapStateToProps)(LoadingSpinner);
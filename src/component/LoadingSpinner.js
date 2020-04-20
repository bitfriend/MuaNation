import React, { PureComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

class LoadingSpinner extends PureComponent {
  render = () => this.props.loading !== 0 && (
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
      <ActivityIndicator color="white" size="large" />
    </View>
  )
}

const mapStateToProps = ({
  common: { loading }
}) => ({
  loading
});

export default connect(mapStateToProps)(LoadingSpinner);

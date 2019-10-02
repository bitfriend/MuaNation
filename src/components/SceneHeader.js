import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { verticalScale } from 'react-native-size-matters';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class SceneHeader extends Component {
  render() {
    return (
      <Header
        containerStyle={styles.container}
        leftComponent={this.props.leftIcon === false ? undefined : {
          icon: 'arrow-back',
          type: 'ionicons',
          color: this.props.customTheme.palette.grey0,
          size: verticalScale(20),
          iconStyle: { padding: verticalScale(10) },
          containerStyle: { marginLeft: 0 },
          onPress: () => this.props.navigation.pop()
        }}
        centerComponent={this.props.title ? {
          text: this.props.title,
          style: {
            color: this.props.customTheme.palette.grey0,
            fontSize: verticalScale(24),
            fontWeight: 'bold',
            fontFamily: 'Lato',
            textTransform: 'capitalize'
          }
        } : undefined}
        rightComponent={this.props.rightIcon ? this.props.rightIcon : undefined}
      />
    );
  }
}

SceneHeader.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(Platform.OS === 'ios' ? 88 : 88 - StatusBar.currentHeight),
    backgroundColor: 'transparent',
    borderBottomColor: undefined,
    borderBottomWidth: undefined
  }
});

const mapStateToProps = ({
  common: { theme }
}) => ({
  customTheme: theme
});

export default compose(
  withNavigation,
  connect(mapStateToProps)
)(SceneHeader);

import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

class SceneHeader extends Component {
  render() {
    let leftIcon = undefined;
    if (this.props.leftIcon === true) {
      leftIcon = {
        icon: 'arrow-back',
        type: 'ionicons',
        color: EStyleSheet.value('$grey0Color'),
        size: EStyleSheet.value('20rem'),
        iconStyle: styles.leftIcon,
        containerStyle: { marginLeft: 0 },
        onPress: () => this.props.navigation.pop()
      };
    } else if (typeof this.props.leftIcon === 'object') {
      leftIcon = this.props.leftIcon;
    }
    return (
      <Header
        containerStyle={styles.container}
        leftComponent={leftIcon}
        centerComponent={this.props.title ? {
          text: this.props.title,
          style: styles.center
        } : undefined}
        rightComponent={this.props.rightIcon ? this.props.rightIcon : undefined}
      />
    );
  }
}

SceneHeader.propTypes = {
  title: PropTypes.string
}

SceneHeader.defaultProps = {
  leftIcon: true
}

const styles = EStyleSheet.create({
  container: {
    '@media ios': {
      height: '88rem'
    },
    '@media android': {
      height: EStyleSheet.value('88rem') - StatusBar.currentHeight
    },
    backgroundColor: 'transparent',
    borderBottomColor: undefined,
    borderBottomWidth: undefined
  },
  leftIcon: {
    padding: '10rem'
  },
  center: {
    color: '$grey0Color',
    fontSize: '24rem',
    fontWeight: 'bold',
    fontFamily: 'Lato'
  }
});

export default withNavigation(SceneHeader);

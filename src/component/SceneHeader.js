import React, { PureComponent } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

class SceneHeader extends PureComponent {
  render() {
    let leftIcon = undefined;
    if (this.props.leftIcon === true) {
      leftIcon = {
        icon: 'arrow-back',
        type: 'ionicons',
        color: EStyleSheet.value('$grey0Color'),
        size: EStyleSheet.value('20rem'),
        containerStyle: styles.leftIconContainer,
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
        rightComponent={this.props.rightIcon}
      />
    );
  }
}

SceneHeader.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.object
}

SceneHeader.defaultProps = {
  leftIcon: true
}

const styles = EStyleSheet.create({
  container: {
    '@media ios': {
      height: EStyleSheet.value('44rem') + getStatusBarHeight(),
      paddingTop: getStatusBarHeight()
    },
    '@media android': {
      height: '44rem',
      paddingTop: 0
    },
    paddingHorizontal: '16rem',
    backgroundColor: 'transparent',
    borderBottomColor: undefined,
    borderBottomWidth: undefined
  },
  leftIconContainer: {
    width: '40rem',
    height: '40rem',
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    color: '$grey0Color',
    fontSize: '24rem',
    fontWeight: 'bold',
    fontFamily: 'Lato'
  }
});

export default withNavigation(SceneHeader);

import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import colors from './theme/colors';

class SceneHeader extends Component {
  render() {
    return (
      <Header
        containerStyle={styles.container}
        leftComponent={{
          icon: 'arrow-back',
          type: 'ionicons',
          color: colors.smokyBlack,
          size: 20,
          iconStyle: { padding: 10 },
          containerStyle: { marginLeft: 0 },
          onPress: () => this.props.navigation.pop()
        }}
        centerComponent={this.props.title ? {
          text: this.props.title,
          style: styles.title
        } : undefined}
      />
    );
  }
}

SceneHeader.propTypes = {
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 88 : 88 - StatusBar.currentHeight,
    backgroundColor: 'transparent'
  },
  title: {
    color: '#17050b',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    textTransform: 'capitalize'
  }
});

export default withNavigation(SceneHeader);

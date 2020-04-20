import React, { PureComponent } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;
const perspective = windowWidth;
const angle = Math.atan(perspective / (windowWidth / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export default class CubeNavigation extends PureComponent {
  animatedValue = new Animated.Value(0)

  getTransformStyle(index) {
    const offset = index * windowWidth;
    const inputRange = [offset - windowWidth, offset + windowWidth];
    const translateX = this.animatedValue.interpolate({
      inputRange,
      outputRange: [windowWidth / ratio, -windowWidth / ratio],
      extrapolate: 'clamp'
    });
    const rotateY = this.animatedValue.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: 'clamp'
    });
    const translateX1 = this.animatedValue.interpolate({
      inputRange,
      outputRange: [windowWidth / 2, -windowWidth / 2],
      extrapolate: 'clamp'
    });
    const extra = windowWidth / ratio / Math.cos(angle / 2) - windowWidth / ratio;
    const translateX2 = this.animatedValue.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: 'clamp'
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 }
      ]
    };
  }

  getBlackdropStyle(index) {
    const { backdropOpacity } = this.props;
    const offset = index * windowWidth;
    const inputRange = [offset - windowWidth, offset, offset + windowWidth];
    const opacity = this.animatedValue.interpolate({
      inputRange,
      outputRange: [backdropOpacity, 0, backdropOpacity],
      extrapolate: 'clamp'
    });
    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity
    };
  }

  render = () => (
    <View style={{
      flex: 1,
      backgroundColor: this.props.backgroundColor
    }}>
      {this.props.children.map((child, index) => (
        <Animated.View style={this.getTransformStyle(index)} key={child.id || index}>
          {child}
          <Animated.View style={this.getBlackdropStyle(index)} />
        </Animated.View>
      ))}
      <Animated.ScrollView
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={windowWidth}
        contentContainerStyle={{ width: windowWidth * this.props.children.length }}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: { x: this.animatedValue }
            }
          }],
          {
            useNativeDriver: true
          }
        )}
        decelerationRate={0.99}
        horizontal
      />
    </View>
  )
}

CubeNavigation.propTypes = {
  backdropOpacity: PropTypes.number,
  backgroundColor: PropTypes.string
};

CubeNavigation.defaultProps = {
  backdropOpacity: 0.8,
  backgroundColor: 'black'
};
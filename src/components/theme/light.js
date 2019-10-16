import { verticalScale } from 'react-native-size-matters';
import { primary, secondary, success, warning, danger, white, black } from './common';

export const palette = {
  primary,
  secondary,
  success,
  warning,
  danger,
  black,
  white,
  grey0: '#43393d',
  grey1: '#8f888b',
  grey2: '#d8d7dc',
  grey3: '#edecec'
};

export const gradients = [{
  start: '#ce4d82',
  end: '#4c39e8'
},{
  start: '#ed7d3a',
  end: '#ce4d82'
}];

export const overlays = ['rgba(20, 7, 12, 0.8)', 'rgba(206, 77, 130, 0.8)'];

import { Platform } from 'react-native';

export const buttonShadow = Platform.select({
  ios: {
    shadowRadius: verticalScale(6),
    shadowColor: '#ef4492',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: verticalScale(6) }
  },
  android: {
    elevation: verticalScale(6)
  }
});

export const shadows = [
  Platform.select({
    ios: {
      shadowRadius: verticalScale(4),
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: verticalScale(2) }
    },
    android: {
      elevation: verticalScale(2)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(8),
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.08,
      shadowOffset: { width: verticalScale(1), height: verticalScale(4) }
    },
    android: {
      elevation: verticalScale(4)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(16),
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.06,
      shadowOffset: { width: verticalScale(2), height: verticalScale(12) }
    },
    android: {
      elevation: verticalScale(12)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(24),
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.06,
      shadowOffset: { width: verticalScale(3), height: verticalScale(16) }
    },
    android: {
      elevation: verticalScale(16)
    }
  }),
];

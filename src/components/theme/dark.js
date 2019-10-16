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
  grey0: '#edecec',
  grey1: '#d0cdce',
  grey2: '#8f888b',
  grey3: '#43393d'
};

export const gradients = [{
  start: '#ff508d',
  end: '#614efb'
},{
  start: '#fd9253',
  end: '#ff508d'
}];

export const overlays = ['rgba(255, 255, 255, 0.8)', 'rgba(224, 76, 137, 0.8)'];

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
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 0, height: verticalScale(2) }
    },
    android: {
      elevation: verticalScale(2)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(8),
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: verticalScale(1), height: verticalScale(4) }
    },
    android: {
      elevation: verticalScale(4)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(16),
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: verticalScale(2), height: verticalScale(12) }
    },
    android: {
      elevation: verticalScale(12)
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: verticalScale(24),
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: verticalScale(3), height: verticalScale(16) }
    },
    android: {
      elevation: verticalScale(16)
    }
  }),
];

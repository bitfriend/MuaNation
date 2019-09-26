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
    shadowRadius: 16,
    shadowColor: 'rgb(239, 58, 160)',
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 6 }
  },
  android: {
    elevation: 6
  }
});

export const shadows = [
  Platform.select({
    ios: {
      shadowRadius: 4,
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 0, height: 2 }
    },
    android: {
      elevation: 2
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 8,
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 1, height: 4 }
    },
    android: {
      elevation: 4
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 16,
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 2, height: 12 }
    },
    android: {
      elevation: 12
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 24,
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 3, height: 16 }
    },
    android: {
      elevation: 16
    }
  }),
];

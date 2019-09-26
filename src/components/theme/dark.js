const black = '#14070c';
const white = '#ffffff';

export const palette = {
  primary: '#4c39e8',
  secondary: '#ce4d82',
  success: '#04a777',
  warning: '#fabc3c',
  danger: '#ed7d3a',
  black,
  white,
  grey0: white,
  grey1: '#edecec',
  grey2: '#d0cdce',
  grey3: '#8f888b',
  grey4: '#43393d',
  grey5: black
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

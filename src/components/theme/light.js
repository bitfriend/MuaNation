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
  grey0: black,
  grey1: '#43393d',
  grey2: '#8f888b',
  grey3: '#d8d7dc',
  grey4: '#edecec',
  grey5: white
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
    shadowRadius: 16,
    shadowColor: '#ef4492',
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
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 }
    },
    android: {
      elevation: 2
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 8,
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.08,
      shadowOffset: { width: 1, height: 4 }
    },
    android: {
      elevation: 4
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 16,
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.06,
      shadowOffset: { width: 2, height: 12 }
    },
    android: {
      elevation: 12
    }
  }),
  Platform.select({
    ios: {
      shadowRadius: 24,
      shadowColor: 'rgb(37, 9, 19)',
      shadowOpacity: 0.06,
      shadowOffset: { width: 3, height: 16 }
    },
    android: {
      elevation: 16
    }
  }),
];

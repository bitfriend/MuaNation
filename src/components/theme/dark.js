import EStyleSheet from 'react-native-extended-stylesheet';
import { primary, secondary, success, warning, danger, white, black } from './common';

export const darkColors = {
  $primaryColor: primary,
  $secondaryColor: secondary,
  $successColor: success,
  $warningColor: warning,
  $dangerColor: danger,
  $blackColor: black,
  $whiteColor: white,
  $grey0Color: '#edecec',
  $grey1Color: '#d0cdce',
  $grey2Color: '#8f888b',
  $grey3Color: '#43393d',
  $gradient0StartColor: '#ff508d',
  $gradient0EndColor: '#614efb',
  $gradient1StartColor: '#fd9253',
  $gradient1EndColor: '#ff508d',
  $overlay0Color: 'rgba(255, 255, 255, 0.8)',
  $overlay1Color: 'rgba(224, 76, 137, 0.8)'
};

export const darkStyles = EStyleSheet.create({
  buttonShadow: {
    '@media ios': {
      shadowRadius: '6rem',
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 0, height: '6rem' }
    },
    '@media android': {
      elevation: '6rem'
    }
  },
  shadow1: {
    '@media ios': {
      shadowRadius: '4rem',
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: 0, height: '2rem' }
    },
    '@media android': {
      elevation: '2rem'
    }
  },
  shadow2: {
    '@media ios': {
      shadowRadius: '8rem',
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: '1rem', height: '4rem' }
    },
    '@media android': {
      elevation: '4rem'
    }
  },
  shadow3: {
    '@media ios': {
      shadowRadius: '16rem',
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: '2rem', height: '12rem' }
    },
    '@media android': {
      elevation: '12rem'
    }
  },
  shadow4: {
    '@media ios': {
      shadowRadius: '24rem',
      shadowColor: 'rgb(4, 1, 3)',
      shadowOpacity: 0.32,
      shadowOffset: { width: '3rem', height: '16rem' }
    },
    '@media android': {
      elevation: '16rem'
    }
  },
});

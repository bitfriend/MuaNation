import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const windowWidth = Dimensions.get('window').width;
const rem = windowWidth / 375; // Design was in width of 375 px

// Pre-define $rem to calculate lightStyles and darkStyles
EStyleSheet.build({
  $rem: rem
});

import { lightColors, lightStyles } from '../../component/theme/light';
import { darkColors, darkStyles } from '../../component/theme/dark';

const themeName = 'light';
const themeColors = themeName === 'light' ? lightColors : darkColors;

const appColors = {
  ...themeColors,
  $container: themeColors[themeName === 'light' ? '$whiteColor' : '$blackColor'],
  $title: themeColors[themeName === 'light' ? '$blackColor' : '$grey0Color'],
  $label: themeColors[themeName === 'light' ? '$grey1Color' : '$grey2Color'],
  $buttonTitle: themeColors[themeName === 'light' ? '$whiteColor' : '$blackColor'],
  $inputContainer: themeColors['$grey3Color'],
  $input: themeColors['$grey0Color'],
  $placeholder: themeColors['$grey1Color'],
  $card: themeColors[themeName === 'light' ? '$whiteColor' : '$grey3Color'],
  $tag: themeColors['$grey2Color'],
  $tagTitle: themeColors['$grey1Color'],
  $tabTitle: themeColors[themeName === 'light' ? '$grey0Color' : '$grey1Color'],
  $heading: themeColors[themeName === 'light' ? '$grey1Color' : '$grey2Color'],
  $extra: themeColors[themeName === 'light' ? '$grey0Color' : '$blackColor'],
  $drawer: themeColors['$grey2Color'],
  $checkedButton: themeColors['$grey0Color'],
  $checkedButtonTitle: themeColors['$grey3Color'],
  $uncheckedButton: themeColors[themeName === 'light' ? '$whiteColor' : '$blackColor'],
  $uncheckedButtonTitle: themeColors['$grey0Color'],
  $toggledButton: themeColors['$primaryColor'],
  $toggledButtonTitle: themeColors[themeName === 'light' ? '$grey3Color' : '$grey0Color'],
  $fullStar: themeColors['$warningColor'],
  $emptyStar: themeColors['$grey2Color']
};

EStyleSheet.build({
  $theme: themeName,
  $rem: rem,
  ...appColors
});

const initialState = {
  loading: 0,
  theme: {
    name: themeName,
    styles: themeName === 'light' ? lightStyles : darkStyles
  },
  statusBar: {
    backgroundColor: 'transparent',
    barStyle: 'dark-content',
    translucent: false
  }
};

import * as types from './types';

export default commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: state.loading + 1
      };
    case types.CLEAR_LOADING:
      return {
        ...state,
        loading: state.loading - 1
      };
    case types.CHANGE_THEME:
      return {
        ...state,
        theme: {
          name: action.payload,
          styles: action.payload === 'light' ? lightStyles : darkStyles
        }
      };
    case types.CHANGE_STATUS_BAR:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

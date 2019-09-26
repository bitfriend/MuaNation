import * as types from './types';
import {
  palette as lightPalette,
  gradients as lightGradients,
  overlays as lightOverlays,
  buttonShadow as lightButtonShadow,
  shadows as lightShadows
} from '../../components/theme/light';
import {
  palette as darkPalette,
  gradients as darkGradients,
  overlays as darkOverlays,
  buttonShadow as darkButtonShadow,
  shadows as darkShadows
} from '../../components/theme/dark';

const initialState = {
  loading: 0,
  themeName: 'light',
  theme: {
    palette: lightPalette,
    gradients: lightGradients,
    overlays: lightOverlays,
    buttonShadow: lightButtonShadow,
    shadows: lightShadows
  }
};

// const initialState = {
//   loading: 0,
//   themeName: 'dark',
//   theme: {
//     palette: darkPalette,
//     gradients: darkGradients,
//     overlays: darkOverlays,
//     buttonShadow: darkButtonShadow,
//     shadows: darkShadows
//   }
// };

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
        themeName: action.payload,
        theme: action.payload === 'dark' ? {
          palette: darkPalette,
          gradients: darkGradients,
          overlays: darkOverlays,
          buttonShadow: darkButtonShadow,
          shadows: darkShadows
        } : {
          palette: lightPalette,
          gradients: lightGradients,
          overlays: lightOverlays,
          buttonShadow: lightButtonShadow,
          shadows: lightShadows
        }
      };
    default:
      return state;
  }
};

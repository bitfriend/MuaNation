import * as types from './types';

const initialState = {
  neighbours: [],
  criteria: {
    category: {
      selected: [],
      deselected: []
    },
    price: {
      min: null,
      max: null
    },
    score: {
      min: null
    },
    distance: {
      max: null
    }
  }
};

export default discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEIGHBOURS_SUCCESS:
      return {
        ...state,
        neighbours: action.payload
      };
    case types.FETCH_NEIGHBOURS_FAILURE:
      return {
        ...state,
        neighbours: []
      };
    case types.GET_CRITERIA_SUCCESS:
      return {
        ...state,
        criteria: action.payload
      };
    case types.GET_CRITERIA_FAILURE:
      return {
        ...state,
        criteria: initialState.criteria
      };
    case types.SELECT_CATEGORY_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          category: {
            selected: [...state.criteria.category.selected, action.payload],
            deselected: state.criteria.category.deselected.filter(category => category !== action.payload)
          }
        }
      };
    case types.SELECT_CATEGORY_FAILURE:
      return state;
    case types.DESELECT_CATEGORY_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          category: {
            selected: state.criteria.category.selected.filter(category => category !== action.payload),
            deselected: [...state.criteria.category.deselected, action.payload]
          }
        }
      };
    case types.DESELECT_CATEGORY_FAILURE:
      return state;
    case types.SET_PRICE_RANGE_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          price: action.payload
        }
      };
    case types.SET_PRICE_RANGE_FAILURE:
      return state;
    case types.SET_MIN_SCORE_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          score: {
            min: action.payload
          }
        }
      };
    case types.SET_MIN_SCORE_FAILURE:
      return state;
    case types.SET_MAX_DISTANCE_SUCCESS:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          distance: {
            max: action.payload
          }
        }
      };
    case types.SET_MAX_DISTANCE_FAILURE:
      return state;
    default:
      return state;
  }
};

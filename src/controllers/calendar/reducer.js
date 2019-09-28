import * as types from './types';

const initialState = {
  bookings: []
};

export default calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload
      };
    case types.GET_BOOKINGS_FAILURE:
      return {
        ...state,
        bookings: []
      };
    default:
      return state;
  }
};

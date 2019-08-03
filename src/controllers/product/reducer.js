import * as types from './types';

const initialState = {
  products: [],
  productDetails: {}
};

export default productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: []
      };
    case types.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: action.payload
      };
    case types.GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetails: {}
      };
    default:
      return state;
  }
};

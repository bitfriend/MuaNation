import * as types from './types';

const initialState = {
  products: [],
  saleProduct: {},
  popularProduct: {}
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
    case types.GET_SALE_PRODUCT_SUCCESS:
      return {
        ...state,
        saleProduct: action.payload
      };
    case types.GET_SALE_PRODUCT_FAILURE:
      return {
        ...state,
        saleProduct: {}
      };
    case types.GET_POPULAR_PRODUCT_SUCCESS:
      return {
        ...state,
        popularProduct: action.payload
      };
    case types.GET_POPULAR_PRODUCT_FAILURE:
      return {
        ...state,
        popularProduct: {}
      };
    default:
      return state;
  }
};

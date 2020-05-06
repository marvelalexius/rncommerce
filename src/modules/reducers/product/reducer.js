import * as constant from './constants';

export const initialState = {
  products: [],
  isRequestingProducts: false,
};

// Reducers
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.PRODUCTS_REQUESTED:
      // const globalState = store.getState();
      return {
        ...state,
        isRequestingProducts: true,
      };
    case constant.PRODUCTS_LOADED:
      // const globalState = store.getState();
      return {
        ...state,
        products: action.products,
        isRequestingProducts: false,
      };
    default:
      return state;
  }
};

export default productReducer;

import * as constant from './constants';

export const initialState = {
  products: [],
  isRequestingProducts: false,
};

// Reducers
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.CART_REQUESTED:
      // const globalState = store.getState();
      return {
        ...state,
        isRequestingProducts: true,
      };
    case constant.CART_LOADED:
      // const globalState = store.getState();
      return {
        ...state,
        products: action.products,
        isRequestingProducts: false,
      };
    case constant.EMPTY_CART:
      return {
        ...state,
        products: [],
        isRequestingProducts: false,
      };
    default:
      return state;
  }
};

export default cartReducer;

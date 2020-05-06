import * as constant from './constants';

// Actions
export const removeFromWishlist = product_id => {
  return dispatch => {
    dispatch({
      type: constant.WISHLIST_REMOVED,
      product: product_id,
    });
  };
};

export const addToWishlist = product_id => {
  return dispatch => {
    dispatch({
      type: constant.WISHLIST_ADDED,
      product: product_id,
    });
  };
};

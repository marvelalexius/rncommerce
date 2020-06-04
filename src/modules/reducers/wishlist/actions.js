import * as constant from './constants';
import api from './../../../utils/api';

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
  return async dispatch => {
    let data = {
      product_id: product_id,
    };

    dispatch({
      type: constant.WISHLIST_REQUESTED,
    });

    const {data: res} = await api.post('/wishlist', data);
    dispatch({
      type: constant.WISHLIST_LOADED,
      payload: res,
    });
  };
};

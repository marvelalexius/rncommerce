import * as constant from './constants';
import api from './../../../utils/api';

// Actions
export const getWishlist = () => {
  return async dispatch => {
    dispatch({
      type: constant.WISHLIST_REQUESTED,
    });

    const {data: res} = await api.get('/wishlist');
    console.log(res.data);
    dispatch({
      type: constant.WISHLIST_LOADED,
      wishlist: res.data,
    });
  };
};

export const toggleWishlist = product_id => {
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

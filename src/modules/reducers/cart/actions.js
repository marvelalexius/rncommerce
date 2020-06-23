import * as constant from './constants';

import api from './../../../utils/api';
import config from './../../../config';

export const getCart = () => {
  return async dispatch => {
    dispatch({
      type: constant.CART_REQUESTED,
    });

    const {data: res} = await api.get('/cart');
    dispatch({
      type: constant.CART_LOADED,
      products: res.data,
    });
  };
};

export const addToCart = cart => {
  console.log(cart);
  return async dispatch => {
    dispatch({
      type: constant.CART_REQUESTED,
    });

    const {data: res} = await api.post('/cart', cart);
    console.log(res.data);
    dispatch({
      type: constant.CART_LOADED,
      products: res.data,
    });
  };
};

export const resetCart = () => {
  return dispatch => {
    dispatch({
      type: constant.EMPTY_CART,
    });
  };
};
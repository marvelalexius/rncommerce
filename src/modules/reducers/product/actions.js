import * as constant from './constants';

import api from './../../../utils/api';

export const productRequest = () => {
  return async dispatch => {
    dispatch({
      type: constant.PRODUCTS_REQUESTED,
    });

    const {data: res} = await api.get('/products');
    dispatch({
      type: constant.PRODUCTS_LOADED,
      products: res.data,
    });
  };
};

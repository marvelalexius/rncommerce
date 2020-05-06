import * as constant from './constants';

import axios from 'axios';

export const productRequest = () => {
  return dispatch => {
    dispatch({
      type: constant.PRODUCTS_REQUESTED,
    });

    const Url = `${url}/api/products`;
    axios.get(Url).then(res => {
      return dispatch({
        type: constant.PRODUCTS_LOADED,
        products: res.data.data,
      });
    });
  };
};

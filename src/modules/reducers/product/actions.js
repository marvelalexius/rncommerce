import * as constant from './constants';

import axios from 'axios';
import config from './../../../config';

export const productRequest = () => {
  return dispatch => {
    dispatch({
      type: constant.PRODUCTS_REQUESTED,
    });

    const url = `${config.api.host}/api/products`;
    axios.get(url).then(res => {
      return dispatch({
        type: constant.PRODUCTS_LOADED,
        products: res.data.data,
      });
    });
  };
};

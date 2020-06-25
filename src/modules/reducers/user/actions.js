import * as constant from './constants';
import api from './../../../utils/api';

export const userLoggedIn = (user, token) => {
  console.log(user, token);
  return dispatch => {
    dispatch({
      type: constant.USER_LOGGED_IN,
      user,
      token,
    });
  };
};

export const userLoggedOut = () => {
  return async dispatch => {
    const {data: res} = await api.post('/auth/logout');
    console.log(res);
    dispatch({
      type: constant.USER_LOGGED_OUT,
    });
  };
};

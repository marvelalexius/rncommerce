import * as constant from './constants';

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
  return dispatch => {
    dispatch({
      type: constant.USER_LOGGED_OUT,
    });
  };
};

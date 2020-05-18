import * as constant from './constants';

export const initialState = {
  user: null,
  isLogin: false,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.USER_LOGGED_IN:
      // const globalState = store.getState();
      return {
        ...state,
        user: action.user,
        isLogin: true,
        token: action.token,
      };
    case constant.USER_LOGGED_OUT:
      // const globalState = store.getState();
      return {
        ...state,
        user: null,
        isLogin: false,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;

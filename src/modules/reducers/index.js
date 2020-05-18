import {combineReducers} from 'redux';
import user from './user';
import product from './product';
// import cart from './cart';
import wishlist from './wishlist';

const rootReducer = combineReducers({
  user: user.reducer,
  product: product.reducer,
  //   cart,
  wishlist: wishlist.reducer,
});

export const actions = {
  ...user.actions,
  ...product.actions,
  ...wishlist.actions,
};

export default rootReducer;

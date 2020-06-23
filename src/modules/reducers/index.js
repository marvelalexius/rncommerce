import {combineReducers} from 'redux';
import user from './user';
import product from './product';
import cart from './cart';
import wishlist from './wishlist';

const rootReducer = combineReducers({
  user: user.reducer,
  product: product.reducer,
  cart: cart.reducer,
  wishlist: wishlist.reducer,
});

export const actions = {
  ...user.actions,
  ...product.actions,
  ...wishlist.actions,
  ...cart.actions,
};

export default rootReducer;

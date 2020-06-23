import * as constant from './constants';

export const initialState = {
  wishlists: [],
  isRequestingWishlist: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.WISHLIST_REQUESTED:
      return {
        ...state,
        isRequestingWishlist: true,
      };
    case constant.WISHLIST_LOADED:
      return {
        ...state,
        wishlist: action.wishlist,
        isRequestingWishlist: false,
      };
    default:
      return state;
  }
};

export default wishlistReducer;

import * as constant from './constants';

export const initialState = {
  wishlists: [],
  isRequestingProducts: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.WISHLIST_ADDED:
      // const globalState = store.getState();
      return {
        ...state,
        wishlists: [...state.wishlists, action.product],
      };
    case constant.WISHLIST_REMOVED:
      // const globalState = store.getState();
      let filtered_wishlists = state.wishlists.filter(wishlist => {
        if (wishlist.id !== action.product) {
          return wishlist;
        }
      });

      // console.log(filtered_wishlists);
      return {
        ...state,
        wishlists: filtered_wishlists,
      };
    default:
      return state;
  }
};

export default wishlistReducer;

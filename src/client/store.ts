// Reference:  https://redux-toolkit.js.org/tutorials/typescript#use-typed-hooks-in-components
// Define Root State & Dispatch Types

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './product/productsSlice';
import cartReducer from './cart/cartSlice';
import homeReducer from './home/homeSlice';

export const store = configureStore({
  //combine slices here to build central store/globabl state
  reducer: {
    //... add each slice's reducer(s) here
    products: productsReducer, // from products slice
    cart: cartReducer,
    home: homeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

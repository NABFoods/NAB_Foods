import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types.ts';

//Using toolkit's createSlice to create reducers for homeSlice
// const productsSlice = createSlice({
//   initialState,
//   name: 'home',
//   reducers: {
//     receivedProducts(state, action: PayloadAction<Product[]>) {
//       const products = action.payload;
//       products.forEach((product) => {
//         state.products[product.id] = product;
//       });
//     }, // define reducers here}
//   },
// });

// // extracts & exports action creator (receivedProducts) as a .actions object containing all action creators of productsSlice
// export const { receivedProducts } = homeSlice.actions;
// export default homeSlice.reducer;

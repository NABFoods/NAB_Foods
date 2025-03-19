// Slice of state for all (plural) products
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types.ts';

// Type for ProductState
export interface ProductsState {
  // Object w/ keys equal to product id
  products: { [id: number]: Product };
}

// Initial state for productsSlice
const initialState: ProductsState = {
  products: {},
};

//Using toolkit's createSlice to create reducers for productsSlice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    receivedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    }, // define reducers here}
  },
});

// extracts & exports action creator (receivedProducts) as a .actions object containing all action creators of productsSlice
export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;

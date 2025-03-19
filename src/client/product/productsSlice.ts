// Slice of state for all (plural) products
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

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
  // define reducers here
  reducers: {
    receivedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    }, 
    removeProduct(state, action: PayloadAction<number>) {
      // Delete product from state using its ID
      delete state.products[action.payload];
    },
  },
});

// extracts & exports action creator (receivedProducts) as a .actions object containing all action creators of productsSlice
export const { receivedProducts, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;

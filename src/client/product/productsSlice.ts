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
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      state.products[product.id] = product;
    }
  },
});

// extracts & exports action creators (ie receivedProducts) from .actions object containing all action creators of productsSlice
export const { receivedProducts, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;

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
      // update slice's draft of state w/ new product
      state.products[product.id] = product;
    },
    toggleSoldOut(state, action: PayloadAction<{ id: number; sold_out: boolean }>) {
      //access product by its id
      const product = state.products[action.payload.id];
      // If the product exists, update its 'sold_out' status based on the payload's 'sold_out' value
      if (product) {
        product.sold_out = action.payload.sold_out;
      }
    },
    // // Reducer for updating a specific field dynamically
    // updateProduct<T extends keyof Product>(
    //   state, action: PayloadAction<{ id: number; field: keyof Product; value: any }>
    // ) {
    //   const { id, field, value } = action.payload;
    //   if (state.products[id]) {
    //     state.products[id][field] = value;
    //   }
    // }
  },
});

// extracts & exports action creators (ie receivedProducts) from .actions object containing all action creators of productsSlice
export const { receivedProducts, removeProduct, addProduct, toggleSoldOut } = productsSlice.actions;
export default productsSlice.reducer;

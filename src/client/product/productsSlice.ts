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
    // Couldn't get the following to work with optinmistic update
    replaceProductOptimisticIdWithRealId(state, action: PayloadAction<Product>) {
      const product = action.payload;
      // Replace the optimistic product with the real one
      if (state.products[product.id]) {
        state.products[product.id] = product;
      }
    },
    toggleSoldOut(state, action: PayloadAction<{ id: number; sold_out: boolean }>) {
      //access product by its id
      const product = state.products[action.payload.id];
      // If the product exists, update its 'sold_out' status based on the payload's 'sold_out' value
      if (product) {
        product.sold_out = action.payload.sold_out;
      }
    },
    // Reducer for updating a specific field dynamically
    // Using generics to enforce type safety for dynamic updates:
    // -> `T extends keyof Product` ensures `T` can only be a valid key of `Product`.
    updateProduct<T extends keyof Product>(  
      // requires explicit typing of state because of using generics (T)
      state: ProductsState, 
      // -> `PayloadAction<{ id: number; field: T; value: Product[T] }>` dynamically adapts to the expected type of the field being updated.
      action: PayloadAction<{ id: number; field: T; value: Product[T] }>
    ) {
      const { id, field, value } = action.payload;
      if (state.products[id]) {
        state.products[id][field] = value;
      }
    }
  },
});

// extracts & exports action creators (ie receivedProducts) from .actions object containing all action creators of productsSlice
export const { receivedProducts, removeProduct, addProduct, toggleSoldOut, updateProduct, replaceProductOptimisticIdWithRealId } = productsSlice.actions;
export default productsSlice.reducer;

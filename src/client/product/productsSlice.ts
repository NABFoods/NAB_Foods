// Slice of state for all (plural) products 
import { createSlice } from "@reduxjs/toolkit"
import type { Product } from "../../types.ts"


// Type for ProductState
export interface ProductsState {
    // Object w/ keys equal to product id
    products: { [id: number]: Product }
}
    

// Initial state for productsSlice
const initialState: ProductsState = {
    products: {},
};

//Using toolkit's createSlice to create reducers for productsSlice
const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {},  // define reducers here
});

export default productsSlice.reducer;

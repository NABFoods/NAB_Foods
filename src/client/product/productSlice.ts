import { createSlice } from "@reduxjs/toolkit"
import type { Product } from "./productComponent"

export interface ProductState {
    products: { [id: string]: Product}
}

const initialState: ProductsState = {
    products: {}
}

const productsSlice = createSlice({
    initialState,
    name: products,
    reducers: {},
})

export default productsSlice.reducer;
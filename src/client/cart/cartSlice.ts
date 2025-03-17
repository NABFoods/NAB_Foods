import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  items: { [productID: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
        // is item already in cart?
        if (state.items[action.payload]) {
            // if yes, increment qty
            state.items[action.payload]++;
        } else {
            // Otherwise, set qty to 1
            state.items[action.payload] = 1;
        }
    },
    updateQuantity(
        state, action: PayloadAction<{ id: string; quantity: number }>
    ) {
        const { id, quantity } = action.payload;
        state.items[id] = quantity;
    }
  },
});

// export addToCart action creator 
export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
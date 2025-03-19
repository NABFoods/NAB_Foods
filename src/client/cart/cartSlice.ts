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
    removeFromCart(state, action:PayloadAction<string>) {
        //if items is already quantity of 0 - just set to 0
        if (state.items[action.payload] === 0) {
          state.items[action.payload] = 0
        //else decrement quantity of the item
        } else if (state.items[action.payload]){
          state.items[action.payload]--
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
export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
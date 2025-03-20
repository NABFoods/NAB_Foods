import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  items: { [productID: string]: number };
  quantity: number;
}

const initialState: CartState = {
  items: {},
  quantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      // is item already in cart?
      if (state.items[action.payload]) {
        // if yes, increment qtyA
        ++state.items[action.payload];
      } else {
        // Otherwise, set qty to 1
        state.items[action.payload] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      //if items is already quantity of 0 - just set to 0
      if (state.items[action.payload] === 0) {
        state.items[action.payload] = 0;
        delete state.items[action.payload];
        //else decrement quantity of the item
      } else if (state.items[action.payload]) {
        --state.items[action.payload];
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },

    selectTotalQuantity(state) {
      state.quantity = 0;
      Object.values(state.items).forEach((itemAmount) => {
        state.quantity += itemAmount;
      });
    },
  },
});

// export addToCart action creator
export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  selectTotalQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

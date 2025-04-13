import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  // Now keys are product_id
  items: { [productID: string]: [number, number, number, string] };
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
    addToCart(
      state,
      action: PayloadAction<{
        product_id: string;
        product_name: string;
        price: number;
      }>
    ) {
      const id = action.payload.product_id;
      if (state.items[id]) {
        // Item already in cart, increment quantity
        ++state.items[id][0];
        // Recalculate total: quantity * price
        state.items[id][2] = state.items[id][0] * state.items[id][1];
      } else {
        state.items[id] = [
          1,
          action.payload.price,
          action.payload.price,
          action.payload.product_name,
        ];
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{
        product_id: string;
        product_name: string;
        price: number;
      }>
    ) {
      const id = action.payload.product_id;
      const item = state.items[id];
      if (!item) return;
      if (item[0] <= 1) {
        delete state.items[id];
      } else {
        item[0]--;
        item[2] = item[0] * item[1];
      }
    },
    deleteFromCart(
      state,
      action: PayloadAction<{
        product_id: string;
        product_name: string;
        price: number;
      }>
    ) {
      const item = state.items[action.payload.product_name];
      //if items is already quantity of 0 - just set to 0
      delete state.items[action.payload.product_name];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      // Implementation if needed
    },
    selectTotalQuantity(state) {
      state.quantity = 0;
      Object.values(state.items).forEach((itemAmount) => {
        state.quantity += itemAmount[0];
      });
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  selectTotalQuantity,
  deleteFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  // Now keys are product_id
  items: { [productID: string]: [number, number, number, string] };
  quantity: number;
  customerData: {
    name: string;
    address: string;
    phone: number;
  };
  status: [boolean, boolean, boolean];
}

const initialState: CartState = {
  items: {},
  quantity: 0,
  customerData: { name: '', address: '', phone: 0 },
  status: [true, false, false],
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

    selectTotalQuantity(state) {
      state.quantity = 0;
      Object.values(state.items).forEach((itemAmount) => {
        state.quantity += itemAmount[0];
      });
    },
    updateStatus(state, action: PayloadAction<number>) {
      const status = state.status;
      for (let i = 0; i < status.length; i++) {
        if (i != action.payload) {
          status[i] = status[i] ? false : true;
        } else {
          status[i] = status[i] ? false : true;
        }
      }
    },
    // updatePickup(state, action: PayloadAction<boolean>) {
    //   state.status.pickup = action.payload;
    // },
    // updateShipping(state, action: PayloadAction<boolean>) {
    //   state.status.shipping = action.payload;
    // },
    // updateDelivery(state, action: PayloadAction<boolean>) {
    //   state.status.delivery = action.payload;
    // },
    updateCustomerInfo(
      state,
      action: PayloadAction<{ field: string; value: string | number }>
    ) {
      if (
        action.payload.field === 'name' &&
        typeof action.payload.value === 'string'
      ) {
        state.customerData.name = action.payload.value;
        console.log(state.customerData.name);
      } else if (
        action.payload.field === 'address' &&
        typeof action.payload.value === 'string'
      ) {
        state.customerData.address = action.payload.value;
        console.log(state.customerData.address);
      } else if (
        action.payload.field === 'phone' &&
        typeof action.payload.value === 'string'
      ) {
        state.customerData.phone = Number(action.payload.value);
        console.log(state.customerData.phone);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCustomerInfo,
  selectTotalQuantity,
  deleteFromCart,
  updateStatus,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  items: { [productID: string]: number[] };
  quantity: number;
}

const initialState: CartState = {
  items: {},
  quantity: 0,
};

//items : {apple: [2, 4, 8], banana: [1, 5]}
//item quantity = apple[0]
//item price = apple[1]
//item total = apple[3]

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product_name: string, price: number }>) {
      // is item already in cart?
      if (state.items[action.payload.product_name]) {
        // if yes, increment qtyA
        ++state.items[action.payload.product_name][0];
        //multiply the quantity of the items [0] byt the price of the item
        console.log("item quantity", state.items[action.payload.product_name][0], "item price", (state.items[action.payload.product_name][1]))
        const newTotal = state.items[action.payload.product_name][0] * state.items[action.payload.product_name][1]
        console.log("did we update??", newTotal)

        state.items[action.payload.product_name][2] = newTotal 
        const updatedTotal = state.items[action.payload.product_name][2]
        console.log("UPDATED TOTAL", updatedTotal)

      } else {
        // Otherwise, set qty to 1
        state.items[action.payload.product_name] = [1, action.payload.price];
      }
    },
    removeFromCart(state, action: PayloadAction<{ product_name: string, price: number }>) {
      //if items is already quantity of 0 - just set to 0
      if (state.items[action.payload.product_name][0] === 0) {
        state.items[action.payload.product_name][0] = 0;
        // delete state.items[action.payload.product_name][0];
        //else decrement quantity of the item
      } else if (state.items[action.payload.product_name][0] && !(state.items[action.payload.product_name][0] === 0)) {
        --state.items[action.payload.product_name][0];
        const newTotal = state.items[action.payload.product_name][0] * state.items[action.payload.product_name][1]
        state.items[action.payload.product_name][2] = newTotal 
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      // state.items[id] = quantity;
    },

    selectTotalQuantity(state) {
      state.quantity = 0;
      Object.values(state.items).forEach((itemAmount) => {
        // console.log('ITEM AMOUNT', current(itemAmount))
        state.quantity += itemAmount[0];
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

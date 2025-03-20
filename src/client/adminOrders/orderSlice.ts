import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Order } from '../../types'
interface OrdersState {
  orders: { [id: number]: Order };
}
const initialState: OrdersState = {
  orders: {},
};
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: (state, action: PayloadAction<Order[]>) => {
      action.payload.forEach((order) => {
        // Adding each order to the orders object with its id as the key
        state.orders[order.order_id] = order;
       console.log('Updated Orders State: ', Object.values(state.orders));
      });
    },
  },
});
export const {getOrders} = ordersSlice.actions
export default ordersSlice.reducer;
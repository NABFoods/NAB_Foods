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
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: number; newStatus: string }>
    ) => {
      const { orderId, newStatus } = action.payload;
      if (state.orders[orderId]) {
        state.orders[orderId].order_status = newStatus;
      }
    },
  },
});
export const { getOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
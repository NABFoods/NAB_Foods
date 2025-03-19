import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Order {
  id: number;
  customerName: string;
  customerId: number;
  address: string;
  phone: string;
  items: string[];
  total: number;
  status: 'pending' | 'approved' | 'denied';
}

interface OrdersState {
  orders: Order[];
}
const initialState: OrdersState = {
  orders: [],
};
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    }
})
export const {getOrder} = ordersSlice.actions
export default ordersSlice.reducer;
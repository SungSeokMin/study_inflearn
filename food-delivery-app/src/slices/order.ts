import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../store/reducer';

export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

interface InitialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: InitialState = {
  orders: [],
  deliveries: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    acceptOrder: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(order => order.orderId === action.payload);
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder: (state, action: PayloadAction<string>) => {
      const ordersIndex = state.orders.findIndex(order => order.orderId === action.payload);
      if (ordersIndex > -1) state.orders.splice(ordersIndex, 1);

      const deliveriesIndex = state.deliveries.findIndex(order => order.orderId === action.payload);
      if (deliveriesIndex > -1) state.deliveries.splice(deliveriesIndex, 1);
    }
  }
});

export const { addOrder, acceptOrder, rejectOrder } = orderSlice.actions;

export const selectOrders = (state: RootStateType) => state.order.orders;

export default orderSlice;

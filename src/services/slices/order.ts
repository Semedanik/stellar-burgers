import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type OrderData = {
  orders: TOrder[];
  getOrderByNumberResponse: TOrder | null;
  error: string | null;
  request: boolean;
  responseOrder: null;
};

export const initialState: OrderData = {
  orders: [],
  getOrderByNumberResponse: null,
  error: null,
  request: false,
  responseOrder: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.request = false;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.error = null;
      state.request = false;
      state.getOrderByNumberResponse = action.payload.orders[0];
    });
  }
});

export const getOrderData = (state: RootState): OrderData => state.order;

export default orderSlice.reducer;

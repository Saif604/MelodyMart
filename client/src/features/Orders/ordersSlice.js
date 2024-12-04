import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllOrdersThunk,createOrderThunk,verifyPaymentThunk, getCurrentUserOrdersThunk} from "./ordersThunk";
import { toast } from "react-toastify";
import {formatDate,formatPrice} from "../../utils/format";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  getAllOrdersThunk
);
export const getCurrentUserOrders = createAsyncThunk(
  "orders/getCurrentUserOrders",
  getCurrentUserOrdersThunk
);
export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderThunk
);
export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  verifyPaymentThunk
);

const initialState = {
  isLoading: false,
  orders: [],
  currentUserOrders: [],
  totalCurrentUserOrder: 0,
  orderCheckout: null,
  totalOrders: 0,
  isError: false,
  tableColumns: [
    { field: "_id", label: "Order ID" },
    { field: "paymentId", label: "Payment ID" },
    { field: "total", label: "Amount" },
    { field: "createdAt", label: "Created At" },
    { field: "updatedAt", label: "Updated At" },
    { field: "status", label: "Status" },
  ],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCheckoutOrder: (state,action) => {
      state.orderCheckout = action.payload;
    },
    clearAllOrders:(state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const { orders, count } = action.payload;
        state.orders = orders;
        state.totalOrders = count;
        state.isLoading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isError = true;
        toast.error(action.payload);
        state.isLoading = false;
      })
      .addCase(getCurrentUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserOrders.fulfilled, (state, action) => {
        const { orders, count } = action.payload;
        state.currentUserOrders = orders.map((order)=>({...order,createdAt:formatDate(order.createdAt),updatedAt:formatDate(order.updatedAt),total:formatPrice(order.total)}));
        state.totalCurrentUserOrder= count;
        state.isLoading = false;
      })
      .addCase(getCurrentUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orderCheckout = order;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(verifyPayment.pending, (state) => {})
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.orderCheckout = null;
        toast.success(action.payload.msg);
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        toast.error(action.payload.msg);
      });
  },
});

export const { setCheckoutOrder,clearAllOrders } = orderSlice.actions;
export default orderSlice.reducer;

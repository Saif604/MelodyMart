import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {createOrderThunk,verifyPaymentThunk, getCurrentUserOrdersThunk, getAllOrdersThunk} from "./ordersThunk";
import { toast } from "react-toastify";
import {formatDate,formatPrice} from "../../utils/format";

export const getCurrentUserOrders = createAsyncThunk(
  "orders/getCurrentUserOrders",
  getCurrentUserOrdersThunk
);
export const getAllOrders = createAsyncThunk("orders/getAllOrders",getAllOrdersThunk)
export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderThunk
);
export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  verifyPaymentThunk
);

const initialState = {
  ordersLoading: false,
  ordersError: false,
  allOrders: [],
  allOrdersCount: 0,
  currentUserOrders: [],
  totalCurrentUserOrder: 0,
  orderCheckout: null,
  allOrderColumns: [
    { field: "orderId", label: "Order ID" },
    {
      field: "createdBy",
      label: "Created By",
    },
    { field: "orderItems", label: "Order Items" },
    { field: "paymentId", label: "Payment ID" },
    { field: "total", label: "Amount" },
    { field: "createdAt", label: "Created At" },
    { field: "status", label: "Status" },
  ],
  currentUserOrderColumns: [
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
      .addCase(getCurrentUserOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getCurrentUserOrders.fulfilled, (state, action) => {
        const { orders, count } = action.payload;
        state.currentUserOrders = orders.map((order) => ({
          ...order,
          createdAt: formatDate(order.createdAt),
          updatedAt: formatDate(order.updatedAt),
          total: formatPrice(order.total),
        }));
        state.totalCurrentUserOrder = count;
        state.ordersLoading = false;
      })
      .addCase(getCurrentUserOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = true;
        toast.error(action.payload);
      })
      .addCase(createOrder.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orderCheckout = order;
        state.ordersLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.ordersLoading = false;
        toast.error(action.payload);
      })
      .addCase(verifyPayment.pending, (state) => {})
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.orderCheckout = null;
        toast.success('Payment verified...');
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(getAllOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        state.allOrders = orders.map((order) => ({
          orderId: order._id,
          createdBy: order.user.name,
          orderItems: order.orderItems.length,
          paymentId: order.paymentId,
          createdAt: formatDate(order.createdAt),
          total: formatPrice(order.total),
          status: order.status,
        }));
        state.ordersLoading = false;
      })
      .addCase(getAllOrders.rejected,(state,action)=>{
        toast.error(action.payload);
        state.ordersLoading = false;
      })
  },
});

export const { setCheckoutOrder,clearAllOrders } = orderSlice.actions;
export default orderSlice.reducer;

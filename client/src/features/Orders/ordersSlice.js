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
  allOrders: [],
  allOrdersCount: 0,
  allOrdersFormatedData:[],
  currentUserOrders: [],
  totalCurrentUserOrder: 0,
  orderCheckout: null,
  currentUserFormatedOrders:[],
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
  status:{
    getCurrentUserOrders:{loading:true,error:null},
    getAllOrders:{loading:true,error:null},
    createOrder:{loading:true,error:null},
    verifyPayment:{loading:true,error:null}
  }
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
        state.currentUserOrders = orders;
        state.totalCurrentUserOrder = count;
        state.currentUserFormatedOrders = orders.map((order) => ({
          ...order,
          createdAt: formatDate(order.createdAt),
          updatedAt: formatDate(order.updatedAt),
          total: formatPrice(order.total),
        }));
        state.status.getCurrentUserOrders.loading = false;
      })
      .addCase(getCurrentUserOrders.rejected, (state, action) => {
        state.status.getCurrentUserOrders.loading = true;
        state.status.getCurrentUserOrders.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createOrder.pending, (state) => {
        state.status.createOrder.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orderCheckout = order;
        state.status.createOrder.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status.createOrder.loading = false;
        state.status.createOrder.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyPayment.pending, (state) => {
        state.status.verifyPayment.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.orderCheckout = null;
        state.status.verifyPayment.loading = false;
        toast.success('Payment verified...');
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status.verifyPayment.loading = false;
        state.status.verifyPayment.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllOrders.pending, (state) => {
        state.status.getAllOrders.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        state.allOrders = orders;
        state.allOrdersFormatedData = orders.map((order) => ({
          orderId: order._id,
          createdBy: order.user.name,
          orderItems: order.orderItems.length,
          paymentId: order.paymentId,
          createdAt: formatDate(order.createdAt),
          total: formatPrice(order.total),
          status: order.status,
        }));
        state.status.getAllOrders.loading = false;
      })
      .addCase(getAllOrders.rejected,(state,action)=>{
        state.status.getAllOrders.loading = false;
        state.status.getAllOrders.error = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { setCheckoutOrder,clearAllOrders } = orderSlice.actions;
export default orderSlice.reducer;

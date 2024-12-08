import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrdersThunk } from "./allOrdersThunk";
import { formatDate, formatPrice } from "../../utils/format";

export const getAllOrders = createAsyncThunk(
  "allOrders/getAllOrders",
  getAllOrdersThunk
);

const initialState = {
  isLoading: true,
  isError: false,
  allOrders: [],
  tableColumns: [
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
};

const allOrdersSlice = createSlice({
    name:"allOrders",
    initialState,
    reducers:()=>{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrders.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            const {orders} = action.payload;
            state.allOrders = orders.map((order)=>({
                orderId:order._id,
                createdBy:order.user.name,
                orderItems:order.orderItems.length,
                paymentId:order.paymentId,
                createdAt:formatDate(order.createdAt),
                total:formatPrice(order.total),
                status: order.status
            }))
            state.isLoading = false;
        })
    }
});


export const {} = allOrdersSlice.actions;
export default allOrdersSlice.reducer;

import axios from "axios";
import { clearCart } from "../Cart/cartSlice";
import { closeModal } from "../Modal/modalSlice";

const getAllOrdersThunk = async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`/api/v1/orders`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

const getCurrentUserOrdersThunk = async(_,thunkAPI) =>{
  try{
    const {data} = await axios.get("/api/v1/orders/showAllMyOrders");
    return data;
  }
  catch(error){
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

const createOrderThunk = async (order, thunkAPI) => {
  try {
    const {data} = await axios.post("/api/v1/orders", order);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

const verifyPaymentThunk = async (paymentData, thunkAPI) => {
  const {dispatch,rejectWithValue} = thunkAPI;
  try {
    const response = await axios.post(
      "/api/v1/orders/verifyPayment",
      paymentData
    );
    dispatch(clearCart());
    dispatch(closeModal());  //modal should be close when navigate checkout from modal
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};

export { getAllOrdersThunk, getCurrentUserOrdersThunk, createOrderThunk, verifyPaymentThunk };
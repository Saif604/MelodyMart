import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../utils/index.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Stripe from "stripe";
// const fakeStripAPI = async ({ amount, currency }) => {
//   const client_secret = "someRandomValue";
//   return { client_secret, amount };
// };
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee} = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart Item Provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }
  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    if(!item.color){
      throw new BadRequestError("Please provide color of item");
    }
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${item.product}`);
    }
    const { name, price, images, _id, colors } = dbProduct;
    if(!colors.includes(item.color)){
      throw new BadRequestError("Provided color is not availabe");
    }
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image:images[0],
      product: _id,
      color:item.color
    };
    //add items to order
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = subtotal + shippingFee + tax;
  //get client secret
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
    payment_method_types: ["card"],
  });
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order});
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findOne({ _id: orderID });
  if (!order) {
    throw new NotFoundError(`No order with id: ${orderID}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const updateOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderID });
  if (!order) {
    throw new NotFoundError(`No order with id: ${orderID}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../utils/index.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { instance } from "../app.js";
import crypto from "crypto";

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart Item Provided");
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }
  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    if (!item.color) {
      throw new BadRequestError("Please provide color of item");
    }
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${item.product}`);
    }
    const { name, price, images, _id, colors } = dbProduct;
    if (!colors.includes(item.color)) {
      throw new BadRequestError("Provided color is not availabe");
    }
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image: images[0].url,
      product: _id,
      color: item.color,
    };
    //add items to order
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = subtotal + shippingFee + tax;
  const options = {
    amount: total,
    currency: "INR",
  };
  const orderSecrets = await instance.orders.create(options);
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    user: req.user.userId,
    orderSecrets,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate({
    path: "user",
    select: "name email",
  });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const orderPaymentVerification = async (req, res) => {
  const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
    req.body;
  if (
    !orderId ||
    !razorpayPaymentId ||
    !razorpayOrderId ||
    !razorpaySignature
  ) {
    throw new BadRequestError("Please provide id and signature");
  }
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order exist with id: ${orderId}`);
  }
  if (order.status === "paid") {
    throw new BadRequestError("Order already placed");
  }
  const secret = process.env.RAZORPAY_API_SECRET;

  // const shasum = crypto.createHmac("sha256", );
  const shasum = crypto.createHmac("sha256", secret);

  shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);

  const digest = shasum.digest("hex");

  // comaparing our digest with the actual signature
  if (digest !== razorpaySignature) {
    order.status = "failed";
    await order.save();
    throw new BadRequestError("Transaction not legit");
  }

  order.paymentId = razorpayPaymentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Payment successful",
  });
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
  const { paymentId } = req.body;
  const order = await Order.findOne({ _id: orderID });
  if (!order) {
    throw new NotFoundError(`No order with id: ${orderID}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentId = paymentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).populate(
    "orderItems.product"
  );

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  orderPaymentVerification,
};

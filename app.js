import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Serve static files from the React app only after defining API routes
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client', 'build')));
}

import authRouter from "./routes/authRouters.js";
import userRouter from "./routes/userRouters.js"
import productRouter from "./routes/productRouters.js";
import reviewRouter from "./routes/reviewRouters.js";
import orderRouter from "./routes/orderRouters.js";

import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import notFoundMiddleware from "./middlewares/notFound.js";

import connectDB from "./db/connect.js";

const server = express();

server.use(morgan("tiny"));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.json());
server.use(fileUpload({useTempFiles:true}));

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/reviews", reviewRouter);
server.use("/api/v1/orders", orderRouter);

// Serve static files for the React app
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client', 'build')));

  // React handles non-API frontend routes (e.g., `/about`, `/contact`)
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () =>
      console.log(`Server is listening on port: ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};
start();

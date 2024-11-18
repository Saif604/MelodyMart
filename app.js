import express from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRouter from "./routes/authRouters.js";
import productRouter from "./routes/productRouters.js";

import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import notFoundMiddleware from "./middlewares/notFound.js";

import connectDB from "./db/connect.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const server = express();

server.use(morgan("tiny"));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.json());
server.use(fileUpload({useTempFiles:true}));


server.get("/api/v1", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/products",productRouter);

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

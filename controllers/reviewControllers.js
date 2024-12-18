import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import {BadRequestError,NotFoundError} from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";

const createReview = async (req, res) => {
  const { product: productID} = req.body;
  const isValidProduct = await Product.findOne({ _id: productID });
  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }
  const alreadyReviewed = await Review.findOne({
    product: productID,
    user: req.user.userId,
  });
  if (alreadyReviewed) {
    throw new BadRequestError(
      "Already submitted review for this product"
    );
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  }).populate({path:"user",select:"name"});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFoundError(
      `No review is found with id: ${reviewID}`
    );
  }
  res.status(StatusCodes.OK).send({ review });
};
const updateReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFoundError(`No review with id: ${reviewID}`);
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFoundError(
      `No review is found with id: ${reviewID}`
    );
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success, review deleted" });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productID } = req.params;
  const reviews = await Review.find({ product: productID }).populate({path:"user",select:"name"});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getCurrentUserReviews = async(req,res) => {
  const reviews = await Review.find({user:req.user.userId}).populate({path:"product",select:"images"});
  res.status(StatusCodes.OK).json({reviews,count:reviews.length});
}
export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getCurrentUserReviews
};

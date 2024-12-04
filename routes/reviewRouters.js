import express from "express";
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getCurrentUserReviews
} from "../controllers/reviewControllers.js";
import { authenticateUser } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").post(authenticateUser, createReview).get(getAllReviews);
router.route("/showAllMyReviews").get(authenticateUser,getCurrentUserReviews);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;

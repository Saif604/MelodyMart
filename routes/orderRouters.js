import express from "express";
import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrder,
  orderPaymentVerification,
} from "../controllers/orderControllers.js";
import {
  authenticateUser,
  authorizePermission,
} from "../middlewares/authentication.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authorizePermission("admin", "owner"), getAllOrders)
  .post(authenticateUser, createOrder);
router.route("/verifyPayment").post(orderPaymentVerification);
router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);
router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

export default router;

import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct} from "../controllers/productControllers.js";
import { getSingleProductReviews } from "../controllers/reviewControllers.js";
import { authenticateUser,authorizePermission } from "../middlewares/authentication.js";

const router = express.Router();

const middleware = [authenticateUser,authorizePermission("admin")];

router.route("/").get(getAllProducts).post(middleware,createProduct);
router.route("/:id").get(getSingleProduct).patch(middleware,updateProduct).delete(middleware,deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

export default router;
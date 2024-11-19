import express from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/productControllers.js";
import { authenticateUser,authorizePermission } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").post(authenticateUser,authorizePermission("admin"),createProduct).get(getAllProducts);
router.route("/:id").get(getSingleProduct);

export default router;
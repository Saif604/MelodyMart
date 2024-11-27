import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userControllers.js";
import {
  authenticateUser,
  authorizePermission,
} from "../middlewares/authentication.js";
import express from "express";
const router = express.Router();

const middleware = [authenticateUser,authorizePermission("admin","owner")];

router
  .route("/")
  .get(middleware, getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);

export default router;

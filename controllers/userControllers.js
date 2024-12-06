import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import {NotFoundError,BadRequestError,UnauthenticatedError} from "../errors/index.js";
import {
  attachCookieToResponse,
  createTokenUser,
  checkPermissions,
} from "../utils/index.js";
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};
// updateUser using user.save()
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookieToResponse(res,tokenUser);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide passwords");
  }
  const { userId } = req.user;
  let user = await User.findOne({ _id: userId });
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success, password updated" });
};
export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

// updateUser using findOneAndUpdate
// const updateUser = async (req,res) =>{
//     const {name, email} = req.body;
//     if(!name || !email){
//         throw new BadRequestError("Please provide all values");
//     }
//     const user = await User.findOneAndUpdate({_id:req.user.userId},{name,email},{new:true, runValidators:true});
//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({response: res, user: tokenUser});
//     res.status(StatusCodes.OK).json({user: tokenUser});
// }

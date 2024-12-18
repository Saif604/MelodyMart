import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { attachCookieToResponse, createTokenUser } from "../utils/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("User already exists");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  attachCookieToResponse(res, tokenUser);
  res.status(StatusCodes.CREATED).json({ user: tokenUser});
};
const login = async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookieToResponse(res, tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser});
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({user:null});
};

export { login, register, logout};

import { StatusCodes } from "http-status-codes";
const notFoundMiddleware = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route doesn't exists" });
};
export default notFoundMiddleware;
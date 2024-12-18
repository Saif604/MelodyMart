import { UnauthorizedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (
    requestUser.role === "admin" ||
    requestUser.userId === resourceUserId.toString()
  )
    return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;

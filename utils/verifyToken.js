import Jwt from "jsonwebtoken";
const verifyToken = (token) =>{
    return Jwt.verify(token,process.env.JWT_SECRET);
}

export default verifyToken;
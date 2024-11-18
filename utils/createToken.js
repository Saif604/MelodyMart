import Jwt from "jsonwebtoken";
const createToken = (data) => {
    const token = Jwt.sign(data,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
    return token;
}

export default createToken;
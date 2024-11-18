import { verifyToken } from "../utils/index.js";
import {UnauthenticatedError, UnauthorizedError} from "../errors/index.js";


const authenticateUser = async (req,res,next) =>{
    const {token} = await req.signedCookies;
    if(!token){
        throw new UnauthenticatedError("Authentication Invalid");
    }
    try{
        const payload = verifyToken(token);
        req.user = {...payload};
        next()
    }
    catch(err){
        throw new UnauthenticatedError("Authentication Invalid");
    }
}

const authorizePermission = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    }
}

export {authenticateUser, authorizePermission};

const createTokenUser = (user) =>{
    const {_id:userId,name,email,role} = user;
    return {userId,name,email,role };
}
export default createTokenUser;
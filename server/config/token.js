import jwt from 'jsonwebtoken';

const genToken = async (userId) =>{
    try {
      const token = jwt.sign({id:userId},process.env.JWTSECRET,{expiresIn:"7d"});
      return token;
    }catch(error){
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}

export default genToken;
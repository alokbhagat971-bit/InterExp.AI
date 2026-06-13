import jwt from 'jsonwebtoken';

const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies;

        if(!token){
            return res.status(400).json({error:"Unauthorized"});
        }

        const verifyToken = jwt.verify(token, process.env.JWTSECRET);

        if(!verifyToken){
            return res.status(400).json({error:"Unauthorized"});
        }

        req.userId = verifyToken.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"});
    }

}

export default isAuth;
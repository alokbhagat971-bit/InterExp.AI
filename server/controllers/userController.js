import User from "../models/user.js";

export const getCurrentUser = async (req,res) =>{
    try {
        
      const userId = req.userId;

      const user = await User.findById(req.userId);

      if(!user) {
        return res.status(404).json({error:"User not found"});
      }

      return res.status(200).json(user);

    }catch(error){
        console.error("Error in getCurrentUser:", error);
        res.status(500).json({error: "Internal server error"});
    }
}
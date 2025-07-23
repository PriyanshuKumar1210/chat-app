//it is used to check the authentication before updating the profile picture

import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async(req, res,next) => {
    try {
        const token = req.cookies.jwt; //token is or not

        if (!token) {
            return res.status(401).json({msg:"Unauthorized - No token Provided"});
        }

        //decode the token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(401).json({msg:"Unauthorized - Invalid token"});
        }

        //try to find the user in database
        const user = await User.findById(decodedToken.userId).select("-password");

        if(!user){
            return res.status(404).json({msg:"Unauthorized - User not found"});
        }
        req.user = user;

        next(); //call the updateprofile function
    }

    catch(error){
        console.log("Error in protect Route Middleware : ",error.message);
        res.status(500).json({msg:"Internal server error"});
    }
}
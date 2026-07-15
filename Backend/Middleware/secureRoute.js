import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"

const secureRoute = async (req , res, next) => {
    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message : "Unauthirized Access "})
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if(!verified){
            return res.status(402).json({message : "Invalid Token "})
        }
        const user = await User.findById(verified.userId).select("-password -confirmPassword")

        if(!user){
            return res.status(403).json({message : "User Not Found"})
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error)
        res.status(501).json({message : "Invalid | Server Error"})
    }
}

export default secureRoute
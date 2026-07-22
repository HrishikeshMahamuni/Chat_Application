import User from "../Models/user.model.js";
import bccrypt from "bcryptjs";
import createToken from "../Jwt/generativeToken.js";

const signup = async (req, res) => {

    try {
         const { name, email, password, confirmPassword } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            })
        } 

        const user = await User.findOne({email});
        if(user) {
                return res.status(400).json({
                message: "User already exists"
            })
        }

        const HashedPassword = await bccrypt.hash(password, 10);

        const newUser = await new User(
            {
                name, 
                email, 
                password: HashedPassword, 
                confirmPassword 
            });
        

        await newUser.save();

        if(newUser) {
            createToken(newUser._id, res);
            res.status(201).json({
                message: "User created successfully", newUser :{
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            })
        }
            
    } 
    catch (error) {
            
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }       


        const isMatch = await bccrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        createToken(user._id, res);
        res.status(200).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } 
    catch (error) {
            
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const logout = async (req, res) => {
    try {
        const isProd = process.env.NODE_ENV === 'production';
        res.clearCookie('jwt', { sameSite: isProd ? 'none' : 'lax', secure: isProd });
        res.status(200).json({
            message: "User logged out successfully"
        })
        
    } 
    catch (error) {
            
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const getUserProfile = async (req, res) => {

    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id:{$ne : loggedInUser}}).select("-password -confirmPassword")
        res.status(200).json({users : filteredUsers })

    }
    catch(error){
        console.log("Error in User Controller - ", error)
        res.status(500).json({ message : "Server Error"})
    }
}


export { signup, login, logout, getUserProfile } //
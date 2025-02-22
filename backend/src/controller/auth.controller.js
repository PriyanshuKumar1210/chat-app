import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body; //fetch that data which sends by users from frontend

    try{

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        //hash passwd
        if(password.length<8){
            return res.status(400).json({msg:"Password should be at least 8 characters"});
        }
        const user = await User.findOne({email});//check user already exists or not

        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
 //bcrypt the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


// create a new User
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            //generate jwt token here
            generateToken(newUser.__id,res)
            await newUser.save()
//sucess message
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(404).json({msg:"Invalid User Data"})
        }

    }
    catch(error){
        console.log("Error in signup controller ",error.message);
        res.status(500).json("Internal server error");
    }
}
//login function 
export const login = async(req,res)=>{
    const  { email,password } = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:"Invalid user credrentials"});
        }

        //comapre the bcrypted password
        const isPasswordCorrect = await bcrypt.compare(password,user.password); 

        if(!isPasswordCorrect){
            return res.status(400).json({msg:"Invalid user credrentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        })
    }
    catch(error){
        console.log("Error in login controller ",error.message);
        res.status(500).json("Internal server error");
    }
}

export const logout = (req,res)=>{
    
}
import cloudinary from "../lib/cloudinary.js";
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
            generateToken(newUser._id,res)
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
};
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
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    }
    catch(error){
        console.log("Error in login controller ",error.message);
        res.status(500).json("Internal server error");
    }
};

export const logout = async(req,res)=>{
    //clearing the cookies
    try{
        res.clearCookie("jwt","",{maxAge:0});
        res.status(200).json("Logged Out Successfully");
    }
    catch(error){
        console.log("Error in login controller ",error.message);
        res.status(500).json("Internal server error");
    }
};

//function to update the profile picture

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ msg: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "chatapp-profiles",
      });
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      ).select("-password"); // Exclude password for security
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in update profile controller:", error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

// this function runs when i refresh the page & checks that user is authenticated
//or not and depending on them we're going to them on profile page or login page

export const checkAuth = (req,res) =>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in check auth controller ",error.message);
        res.status(500).json("Internal server error");
    }
}
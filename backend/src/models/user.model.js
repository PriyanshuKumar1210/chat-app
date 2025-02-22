/**** users models just contain the users information like:- his email,name,passwd,profilepic,id etc. */

import mongoose from "mongoose";

//Defining a schema (A schema is used to defines the structure of document)
//here it defines that which type of data needs in userModel/to user
const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required:true,
        unique:true
    },

    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minlength:8,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    }
},{
    timestamps:true,
}

);

//creating the model
const userModel = mongoose.model('user',userSchema);
/**The schema defines the structure and rules of the data, while the model provides an interface to interact with the database. */

export default userModel;

import express from 'express';
import authRoutes from "./src/routes/auth.route.js";
import { connectDB } from './src/lib/db.js';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';

const app = express();
const port = 5001;

dotenv.config(); //Load the enironment variables

app.use(express.json()); //this middleware used to extract the json data out of body
app.use(cookieParser());
app.use("/api/auth",authRoutes); //This is route and it use When user visit at this api it call the authRoutes
 



connectDB();            //connecting the database
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
 
})
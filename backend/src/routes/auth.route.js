import express from "express";
import { login, signup ,logout} from "../controller/auth.controller.js";

const router = express.Router(); //creates a new router object that can be used to define routes separately from the main application.

/** When user visit to signup or login then  -> */

// signup route

/*
router.get('/signup',(req,res)=>{ 
    res.send("signup");     
})

        we used below signup route beacuse of craeting a sperate authentication of signup
*/

router.post("/signup", signup);

// login route

router.post("/login",login);

// logout route

router.post("/logout",logout);

export default router;

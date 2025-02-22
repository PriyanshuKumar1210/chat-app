import express from "express";
import { login, signup ,logout,updateProfile,checkAuth} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

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

router.put("/update-profile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);

export default router;

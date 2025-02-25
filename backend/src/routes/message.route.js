
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSideBar , getMessages ,sendMessage} from "../controller/message.controller.js";

const router = express.Router();

router.get("/users",protectRoute,getUserForSideBar);
router.get("/:id",protectRoute,getMessages); //get messages from other users

router.post("/send/:id",protectRoute,sendMessage) //send messages to other users

export default router;
import { Router } from "express";
const router = Router();
import { userModel } from "../models/user.models.js";

router.post("/register",async (req,res) => {
    const {name,age,email,password} = req.body;
    //Retomar 1:42
})

export default router;
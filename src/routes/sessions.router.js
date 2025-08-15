import { Router } from "express";
const router = Router();
import { userModel } from "../models/user.models.js";

router.post("/register",async (req,res) => {
    const {name,age,email,password} = req.body;
    const exists = await userModel.findOne({email})
    if (exists) {
        return req.status(400).send({status: error, message:"El usuario ya existe."})
    }
    let userDTO = {name,age,email,password}
    const result = await userModel.create(userDTO)
    console.log(result);
    
    res.send({status: "Success", payload: `${result}`})
})

router.post("/login", async (req,res) => {
    const {email,password} = req.body;
    const user = await userModel.findOne({email,password})
    if (!user) {
        return res.status(401).send({status: error, message:"Datos invalidos."})
    }
    req.session.user = {
        name: user.name,
        email: user.email,
        age: user.age
    }
    res.send({status: "Success", payload: req.session.user, message: "Login"})
})

export default router;
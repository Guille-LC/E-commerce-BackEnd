import { Router } from "express";
import { authToken } from "../utils.js";
const router = Router();

router.get("/login", (req,res) => {
    res.render("login",{style:"main.css"})
})

router.get("/register", (req,res) => {
    res.render("register")
})

router.get("/profile", authToken, (req,res) => {
    res.render("profile",{
        user: req.user
    })
})

export default router;
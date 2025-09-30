import { Router } from "express";
const router = Router();
import { passportCallback,authorization } from "../utils.js";

router.get("/login", (req,res) => {
    res.render("login",{style:"main.css"})
})

router.get("/register", (req,res) => {
    res.render("register")
})

router.get("/profile", passportCallback('jwt'), authorization('user'), (req,res) => {
    res.render("profile",{
        user: req.user.user
    })
})

router.get("/admin", passportCallback('jwt'), authorization('admin'), (req,res) => {
    res.render("admin",{
        user: req.user.user
    })
})

export default router;
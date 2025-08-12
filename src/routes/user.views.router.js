import { Router } from "express";
const router = Router();

router.get("/login", (req,res) => {
    res.render("login",{style:"main.css"})
})

router.get("/register", (req,res) => {
    res.render("register")
})

router.get("/profile", (req,res) => {
    res.render("profile",{
        user: req.session.user
    })
})

export default router;
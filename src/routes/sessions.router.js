import { Router } from "express";
const router = Router();
import { userModel } from "../models/user.models.js";
import { createHash,isValidPassword } from "../utils.js";
import passport from "passport";

router.get("/github",passport.authenticate('github',{scope:'[user:email]'}))

router.get("/githubcallback",passport.authenticate('github',{failureRedirect:'/api/sessions/failedregister'}) ,async (req,res) => {
    const user = req.user;
    req.session.user = {
        name: user.first_name,
        email: user.email
    }
    res.redirect("/views/users/profile")
})

router.post("/register",passport.authenticate('register',{failureRedirect:'/api/sessions/failedregister'}) ,async (req,res) => {
    res.send({status: "Succes", payload: `Usuario registrado`})
})

router.get("/failedregister", (req,res) => {
    res.status(401).send({error: "Error al registrar al usuario"})
})

router.post("/login",passport.authenticate('login', {failureRedirect:'/api/sessions/failedlogin'}) ,async (req,res) => {
    const user = req.user;
    req.session.user = {
        name: user.name,
        email: user.email,
        age: user.age
    }
    res.send({status: "Succes", payload: req.session.user, message: "Login"})
})

router.get("/failedlogin", (req,res) => {
    res.status(401).send({error: "Error al loguear al usuario"})
})

export default router;
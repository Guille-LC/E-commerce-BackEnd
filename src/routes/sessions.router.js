import { Router } from "express";
import { createHash,generateToken,isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router();

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
    
    const acces_token = generateToken(user);

    res.cookie('jwtCookieToken', acces_token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    });

    res.status(200).send({
        status: "Succes",
        acces_token: acces_token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})

router.get("/failedlogin", (req,res) => {
    res.status(401).send({error: "Error al loguear al usuario"})
})

export default router;
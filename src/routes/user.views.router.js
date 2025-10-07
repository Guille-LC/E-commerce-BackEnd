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

router.get("/purchase", passportCallback('jwt'), authorization('user'), async (req,res) => {
    try {
        const cart = await cartModel.findById(user.cartId).populate("products.productId");
        res.render("purchase",{
        user: req.user.user,
        cart
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { message: "Error al cargar la vista de compra" });
    }
})

router.get("/admin", passportCallback('jwt'), authorization('admin'), (req,res) => {
    res.render("admin",{
        user: req.user.user
    })
})

export default router;
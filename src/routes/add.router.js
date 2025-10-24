import { Router } from "express";
const router = Router()
import {__dirname} from "../utils.js";
import { cartModel } from "../models/carritos.models.js";
import { filmsModel } from "../models/products.models.js";

//POST
router.post("/addToCart/:cartId/products/:productId", async (req,res) => {
    let {cartId,productId} = req.params;

    const carts = await cartModel.findById(cartId)
    const product = await filmsModel.findById(productId);

    if (!carts) {
        return res.status(404).send({
            status: "Error",
            message: `No existe carrito con id ${cartId}`
        });
    }

    if (!product) {
        return res.status(404).send({
            status: "Error",
            message: `No existe producto con id ${productId}`
        });
    }

    if (!carts.products) carts.products = [];

    const existing = carts.products.find(p => p.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        carts.products.push({ productId: productId, quantity: 1 });
    }

    const exito = await carts.save();

    if (exito) {
        res.send({
            status: "Success",
            message: `Producto ${productId} agregado al carrito ${cartId}`,
            payload: carts
        });
    } else {
        res.status(500).send({
            status: "Error",
            message: "No se pudo guardar el carrito."
        });
    }
})

export default router;
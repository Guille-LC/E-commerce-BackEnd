import { Router } from "express";
import { logger } from "../config/logger.js";
import {__dirname} from "../utils.js";
import { cartModel } from "../models/carritos.models.js";
import { filmsModel } from "../models/products.models.js";
const router = Router()

router.post("/addToCart/:cartId/products/:productId", async (req,res) => {
    let {cartId,productId} = req.params;

    const carts = await cartModel.findById(cartId)
    const product = await filmsModel.findById(productId);

    if (!carts) {
        logger.warn(`No existe carrito con id ${cartId}`)
        return res.status(404).send({
            status: "Error",
            message: `No existe carrito con id ${cartId}`
        });
    }

    if (!product) {
        logger.warn(`No existe producto con id ${productId}`)
        return res.status(404).send({
            status: "Error",
            message: `No existe producto con id ${productId}`
        });
    }

    if (!carts.products) carts.products = [];

    const existing = carts.products.find(p => {
        const pid = p.productId._id ? p.productId._id.toString() : p.productId.toString();
        return pid === productId.toString();
    });
    if (existing) {
        existing.quantity++;
    } else {
        carts.products.push({ productId: productId, quantity: 1 });
    }

    const exito = await carts.save();

    if (exito) {
        logger.info(`Producto ${productId} agregado al carrito ${cartId}`)
        res.send({
            status: "Success",
            message: `Producto ${productId} agregado al carrito ${cartId}`,
            payload: carts
        });
    } else {
        logger.warn(`No se pudo guardar el carrito.`)
        res.status(500).send({
            status: "Error",
            message: "No se pudo guardar el carrito."
        });
    }
})

export default router;
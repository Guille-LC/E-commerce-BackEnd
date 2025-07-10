import { Router } from "express";
const router = Router()
import {__dirname,leerCarrito,guardarCarrito, leerArchivos} from "../utils.js";

//POST
router.post("/addToCart/:cartId/products/:productId", async (req,res) => {
    let {cartId,productId} = req.params;
    cartId = parseInt(cartId);
    productId = parseInt(productId);

    const carts = await leerCarrito();
    const products = await leerArchivos();

    const carrito = carts.find(c => c.id === cartId);
    if (!carrito) {
        return res.status(404).send({
            status: "Error",
            message: `No existe carrito con id ${cartId}`
        });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send({
            status: "Error",
            message: `No existe producto con id ${productId}`
        });
    }

    const existing = carrito.productsArray.find(p => p.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        carrito.productsArray.push({ productId: productId, quantity: 1 });
    }

    const exito = await guardarCarrito(carts);

    if (exito) {
        res.send({
            status: "Success",
            message: `Producto ${productId} agregado al carrito ${cartId}`,
            payload: carrito
        });
    } else {
        res.status(500).send({
            status: "Error",
            message: "No se pudo guardar el carrito."
        });
    }
})

export default router;
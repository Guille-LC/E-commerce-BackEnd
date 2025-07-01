import { Router } from "express";
const router = Router()
import fs from 'fs';
import __dirname from "../utils.js";

const rutaArchivo = `${__dirname}/data/carts.json`
const codeFormat = 'utf-8'

function leerProductos() {
    const data = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8');
    return JSON.parse(data) ;
}

function leerCarrito() {
    try {
        const cartData = fs.readFileSync(rutaArchivo,codeFormat);
        return JSON.parse(cartData)
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
}

function guardarCarrito(data) {
    try {
        fs.writeFileSync(rutaArchivo,JSON.stringify(data, null, 2),codeFormat);
        return true;
    } catch (error) {
        console.error("❌ Error al guardar archivo:", error.message);
        return false;
    }
}

//POST
router.post("/addToCart/:cartId/products/:productId", (req,res) => {
    let {cartId,productId} = req.params;
    cartId = parseInt(cartId);
    productId = parseInt(productId);

    const carts = leerCarrito();
    const products = leerProductos();

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

    const exito = guardarCarrito(carts);

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
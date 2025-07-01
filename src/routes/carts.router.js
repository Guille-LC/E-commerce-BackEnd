import { Router } from "express";
const router = Router()
import fs from 'fs';
import __dirname from "../utils.js";

//Variables constantes
const rutaArchivo = `${__dirname}/data/carts.json`
const codeFormat = 'utf-8'

console.log(rutaArchivo);


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
router.post("/createCart", (req,res) => {
    let cartId = Math.floor(Math.random() * 100 + 1)
    let products = [];

    let carrito = {
        id: cartId,
        productsArray: products
    }

    let carts = leerCarrito();

    carts.push(carrito)
    
    let exito = guardarCarrito(carts)

    if (exito) {
        res.send({
            status: "Success",
            payload: carrito
        });
    } else {
        res.status(500).send({
            status: "Error",
            message: "No se pudo guardar el carrito."
        });
    }
})

//GET todos
router.get("/all", (req,res) => {
    const carts = leerCarrito();
    res.send({ status: "Success", payload: carts })
})

//GET por id
router.get("/getcart/:cartId", (req,res) => {
    let { cartId } = req.params;
    cartId = parseInt(cartId);

    const cartData = leerCarrito();

    let cartPorId = cartData.find(c => c.id === cartId)

    if(!cartData) {
        return res.status(404).send({ status: "Error", message: `Carrito con el id: ${cartId} no encontrado.` });
    }

    res.send({status: "Success", payload: cartPorId})

})

export default router;
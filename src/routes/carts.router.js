import { Router } from "express";
const router = Router()
import { __dirname, leerCarrito, guardarCarrito} from '../utils.js'

//POST
router.post("/createCart", async (req,res) => {
    let cartId = Math.floor(Math.random() * 100 + 1)
    let products = [];

    let carrito = {
        id: cartId,
        productsArray: products
    }

    let carts = await leerCarrito();

    carts.push(carrito)
    
    let exito = await guardarCarrito(carts)

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
router.get("/all", async (req,res) => {
    const carts = await leerCarrito();
    res.send({ status: "Success", payload: carts })
})

//GET por id
router.get("/getcart/:cartId", async (req,res) => {
    let { cartId } = req.params;
    cartId = parseInt(cartId);

    const cartData = await leerCarrito();

    let cartPorId = cartData.find(c => c.id === cartId)

    if(!cartData) {
        return res.status(404).send({ status: "Error", message: `Carrito con el id: ${cartId} no encontrado.` });
    }

    res.send({status: "Success", payload: cartPorId})

})

export default router;
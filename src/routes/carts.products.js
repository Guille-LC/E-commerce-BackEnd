import { Router } from "express";
const router = Router()
import fs from 'fs';
const rutaArchivo = './newFile.txt'

//POST
router.post("/", (req,res) => {
    let cartId = Math.floor(Math.random() * 100)
    let products = [];

    let carrito = {
        id: cartId,
        productsArray: products
    }

    res,send(carrito)
})

export default router;
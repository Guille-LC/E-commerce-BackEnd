import { Router } from "express";
const router = Router()
import {__dirname,leerArchivos,guardarArchivos,generarIdUnico} from "../utils.js";

//GET: Todos los productos
router.get("/", async (req,res) => {
    const products = await leerArchivos()

    if(!products || products.length === 0) {
        return res.status(404).send({ status: "Error", message: "No se encontraron productos" });
    }

    res.send({ status: "Success", payload: products });
})

//GET: Por su ID
router.get("/:productId", async (req,res) => {
    let { productId } = req.params;
    productId = parseInt(productId);
    const products = await leerArchivos();

    const productPorId = products.find(p => p.id === productId)

    if(!products) {
        return res.status(404).send({ status: "Error", message: `Producto con el id: ${productId} no encontrado.` });
    }

    res.send({ status: "Success", payload: productPorId});
})

//POST
router.post("/create", async (req,res) => {
    let prod = req.body;

    if(!prod.title || !prod.description || !prod.code || !prod.price || !prod.status || !prod.stock || !prod.category) {
        return res.status(400).send({status: "Error", message: "Campos incompletos"})
    }

    const products = await leerArchivos();

    let productId = generarIdUnico(products)

    prod.id = productId

    products.push(prod)

    const exito = await guardarArchivos(products);

    if (exito) {
        res.send({ status: "Success", payload: `Agregado el film con el id: ${prod.id}` });
    } else {
        res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo." });
    }
})

//PUT
router.put("/:productId", async (req,res) => {
    const products = await leerArchivos()

    const { productId } = req.params;
    let prodUpdate = req.body;
    let productPosition = products.findIndex(p => p.id === parseInt(productId))

    if(productPosition === -1) {
        return res.status(404).send({status: "Error", message: "Producto no encontrado"})
    }
    prodUpdate.id = products[productPosition].id
    products[productPosition] = prodUpdate;

    const exito = await guardarArchivos(products);

    exito ? res.send({ status: "Success", message: `Producto con el id ${productId} actualizado exitosamente.` }) : res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo actualizado.", payload: prodUpdate });
})

//DELETE
router.delete("/:productId", async (req,res) => {

    const products = await leerArchivos();

    let { productId } = req.params;
    productId = parseInt(productId);

    let productPosition = products.findIndex(p => p.id === productId)

    if(productPosition === -1) {
        return res.send({status: "Error", message: "Producto no encontrado"})
    }

    products.splice(productPosition, 1)

    const exito = await guardarArchivos(products);

    exito
        ? res.send({ status: "Success", message: `Producto con el id ${productId} eliminado exitosamente.` })
        : res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo actualizado." });
})

export default router;
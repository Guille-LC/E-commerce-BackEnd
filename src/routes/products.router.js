import { Router } from "express";
const router = Router()
import fs from 'fs';
import __dirname from "../utils.js";


//Variables constantes
const rutaArchivo = `${__dirname}/data/products.json`
const codeFormat = 'utf-8'

//Funcion para leer los archivos
function leerArchivos() {
    try {
        const data = fs.readFileSync(rutaArchivo,codeFormat);
        console.log(data);
        
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return [];
    }
}

//Funcion para guardar los archivos
function guardarArchivos(products) {
    try {
        fs.writeFileSync(rutaArchivo, JSON.stringify(products, null, 2), codeFormat);
        return true
    } catch (error) {
        console.error("❌ Error al leer archivo:", error.message);
        return false
    }
}

//GET: Todos los productos
router.get("/", (req,res) => {
    const products = leerArchivos()

    if(!products || products.length === 0) {
        return res.status(404).send({ status: "Error", message: "No se encontraron productos" });
    }

    res.send({ status: "Success", payload: products });
})

//GET: Por su ID
router.get("/:productId", (req,res) => {
    let { productId } = req.params;
    productId = parseInt(productId);
    const products = leerArchivos();

    const productPorId = products.find(p => p.id === productId)

    if(!products) {
        return res.status(404).send({ status: "Error", message: `Producto con el id: ${productId} no encontrado.` });
    }

    res.send({ status: "Success", payload: productPorId});
})

//POST
router.post("/create", (req,res) => {
    let prod = req.body;

    if(!prod.title || !prod.description || !prod.code || !prod.price || !prod.status || !prod.stock || !prod.category) {
        return res.status(400).send({status: "Error", message: "Campos incompletos"})
    }

    const products = leerArchivos();

    prod.id = Math.floor(Math.random() * 100 + 1);

    products.push(prod)

    const exito = guardarArchivos(products);

    if (exito) {
        res.send({ status: "Success", payload: `Agregado el film con el id: ${prod.id}` });
    } else {
        res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo." });
    }
})

//PUT
router.put("/:productId", (req,res) => {
    const products = leerArchivos()

    const { productId } = req.params;
    let prodUpdate = req.body;
    let productPosition = products.findIndex(p => p.id === parseInt(productId))

    if(productPosition === -1) {
        return res.status(404).send({status: "Error", message: "Producto no encontrado"})
    }
    prodUpdate.id = products[productPosition].id
    products[productPosition] = prodUpdate;

    const exito = guardarArchivos(products);

    exito ? res.send({ status: "Success", message: `Producto con el id ${productId} actualizado exitosamente.` }) : res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo actualizado.", payload: prodUpdate });
})

//DELETE
router.delete("/:productId", (req,res) => {

    const products = leerArchivos();

    let { productId } = req.params;
    productId = parseInt(productId);

    let productPosition = products.findIndex(p => p.id === productId)

    if(productPosition === -1) {
        return res.send({status: "Error", message: "Producto no encontrado"})
    }

    products.splice(productPosition, 1)

    const exito = guardarArchivos(products);

    exito
        ? res.send({ status: "Success", message: `Producto con el id ${productId} eliminado exitosamente.` })
        : res.status(500).send({ status: "Error", message: "No se pudo guardar el archivo actualizado." });
})

export default router;
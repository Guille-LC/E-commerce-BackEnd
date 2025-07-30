import { Router } from "express";
const router = Router()
import {__dirname} from "../utils.js";
import { filmsModel } from "../models/products.models.js";

//GET: Todos los productos
router.get("/", async (req,res) => {

    try {
        let products = await filmsModel.find();
        res.send({ status: "Success", payload: products }); 
        console.log(`¡Mongoose conectado correctamente!`);
    } catch (error) {
        console.log("No se pudo conectar con Moongose: " + error);
    }
})

//GET: Por su ID
router.get("/:pid", async (req,res) => {

    try {
        let {pid} = req.params;
        let filmById = await filmsModel.findById(pid)

        if(!filmById) {
            return res.status(404).send({
                status: "Error",
                message: `No se encontró el producto con ID ${pid}`
            });
        }
        res.send({ status: "Success", payload: filmById })
    } catch (error) {
        console.log("No se pudo conectar con Moongose: " + error);
    }
})

//POST
router.post("/create", async (req,res) => {
    try {
        const {title,description,code,price,status,stock,category,thumbnails} = req.body;
        const film = await filmsModel.create({title,description,code,price,status,stock,category,thumbnails})
        console.log(`Creado el film: ${film}`);
        res.send({ status: "Success", payload: film._id });
    } catch (error) {
        console.log("No se pudo conectar con Moongose: " + error);
    }
})

//PUT
router.put("/:pid", async (req,res) => {

    try {
        let {pid} = req.params;
        let filmReplace = req.body;
        if(!filmReplace.title || !filmReplace.description || !filmReplace.category) {
            return res.send({status:"error", error:"Campos incompletos"})
        }
        let result = await filmsModel.updateOne({_id:pid}, filmReplace)
        res.send({status: "Success", payload: result})
    } catch (error) {
        console.log("No se pudo conectar con Moongose: " + error);
    }
})

//DELETE
router.delete("/:pid", async (req,res) => {

    try {
        let {pid} = req.params;
        let result = await filmsModel.deleteOne({_id:pid})
        res.send({status: "Success", payload: result})
    } catch (error) {
        console.log("No se pudo conectar con Moongose: " + error);
    }
})

export default router;
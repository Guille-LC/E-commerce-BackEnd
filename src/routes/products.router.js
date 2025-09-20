import { Router } from "express";
const router = Router()
import {__dirname} from "../utils.js";
import { filmsModel } from "../models/products.models.js";
import { getProductByIdController, getProductsController,createProductController, updateProductWithIdController } from "../controllers/products.controller.js";

//GET: Todos los productos
router.get("/", getProductsController)

//GET: Por su ID
router.get("/:pid", getProductByIdController)

//POST
router.post("/create", createProductController)

//PUT
router.put("/:pid", updateProductWithIdController)

//DELETE
router.delete("/:pid", async (req,res) => {

    try {
        let {pid} = req.params;
        if(!pid) {
            return res.status(404).send({
                status: "Error",
                message: `No se encontró el producto con ID ${pid}`
            });
        }
        let result = await filmsModel.deleteOne({_id:pid})
        res.send({status: "Success", payload: result})
    } catch (error) {
        console.log("No se pudo eliminar: " + error);
    }
})

export default router;
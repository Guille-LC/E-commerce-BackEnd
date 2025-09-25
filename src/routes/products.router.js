import { Router } from "express";
const router = Router()
import {__dirname} from "../utils.js";
import { getProductByIdController, getProductsController,createProductController, updateProductWithIdController, deleteProductWithIdController } from "../controllers/products.controller.js";

//GET: Todos los productos
router.get("/", getProductsController)

//GET: Por su ID
router.get("/:pid", getProductByIdController)

//POST
router.post("/create", createProductController)

//PUT
router.put("/:pid", updateProductWithIdController)

//DELETE
router.delete("/:pid", deleteProductWithIdController)

export default router;
import { Router } from "express";
import { __dirname} from '../utils.js'
import { getCartsController,getCartByIdController, createCartController, updateCartController, deleteCartController} from "../controllers/carts.controller.js";
const router = Router()

//GET todos
router.get("/all", getCartsController)

//GET por id
router.get("/getcart/:cartId", getCartByIdController)

//POST
router.post("/createCart", createCartController)

//PUT
router.put("/:cartId", updateCartController)

//DELETE
router.delete("/:cartId", deleteCartController)

export default router;
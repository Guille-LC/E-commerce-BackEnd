import { Router } from "express";
import { __dirname} from '../utils.js'
import { getCartsController,getCartByIdController, createCartController, updateCartController, deleteCartController, purchaseController} from "../controllers/carts.controller.js";
const router = Router()

//GET
router.get("/all", getCartsController)

router.get("/getcart/:cartId", getCartByIdController)

//POST
router.post("/createCart", createCartController)

router.post("/:cid/purchase", purchaseController)

//PUT
router.put("/:cartId", updateCartController)

//DELETE
router.delete("/:cartId", deleteCartController)

export default router;
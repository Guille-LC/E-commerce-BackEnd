import { createCartService, deleteCartService, getCartByIdService, getCartsService, updateCartService } from "../service/carts.service.js";
import { logger } from "../config/logger.js";

//GET
export const getCartsController = async (req,res) => {
    try {
        const cartsData = await getCartsService();
        if (!cartsData) {
            logger.error(`Controller: No se encontraron carritos.`)
            res.status(404).send({
                status: "Error",
                message: `Controller: No se encontraron carritos.`
            })
        }
        res.send({ status: "Success", payload: cartsData })
    } catch (error) {
        logger.error(error)
    }
}

//GET by ID
export const getCartByIdController = async (req,res) => {
    try {
        let {cartId} = req.params;
        const cartById = await getCartByIdService(cartId);
        if (!cartById) {
            logger.error(`Controller: No se encontro el carrito con el ID: ${cartId}`)
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se encontro el carrito con el id: ${cartId}`
            })
        }
        res.send({status: "Success", payload: cartById})
    } catch (error) {
        logger.error(error)
    }
}

//POST
export const createCartController = async (req,res) => {
    try {
        let newCart = await createCartService(req.boby)
        if(!newCart) {
            logger.error(`Controller: No se encontro el carrito con el ID: ${cartId}`)
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se pudo crear el carrito.`
            })
        }
        return res.status(201).json({status:"Success", payload:newCart})
    } catch (error) {
        logger.error(error)
    }
}

//PUT
export const updateCartController = async (req,res) => {
    try {
        let {cartId} = req.params;
        let updateCart = req.body;
        if(!cartId) {
            logger.error(`Controller: No se encontro el carrito con el ID: ${cartId}`)
            return res.status(404).send({status:"Error", message: `Controller: No se encontro el carrito con el ID:${pid}`})
        }
        const updatedCart = await updateCartService(cartId,updateCart)
        return res.status().send({message:"Controller: Producto actualizado con exito", payload: updatedCart})
    } catch (error) {
        logger.error(error)
    }
}

//DELETE
export const deleteCartController = async (req,res) => {
    try {
        let {cartId} = req.params;
        if(!cartId) {
            logger.error(`Controller: No se encontro el carrito con el ID: ${cartId}`)
        return res.status(404).send({
            status: "Error",
            message: `Controller: No se encontro el carrito con el ID: ${cartId}`
        })
        }
        const deletedCart = await deleteCartService(cartId)
        return res.status(200).json({status: "Success", payload: deletedCart})
    } catch (error) {
        logger.error("Controller: Error en deleteCartController:", error);
        return res.status(500).send({
            status: "Error",
            message: "Controller: Hubo un problema al eliminar el carrito"
        });
    }
}
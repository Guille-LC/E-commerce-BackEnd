import { createCartService, deleteCartService, getCartByIdService, getCartsService, updateCartService } from "../service/carts.service.js";

//GET
export const getCartsController = async (req,res) => {
    try {
        const cartsData = await getCartsService();
        if (!cartsData) {
            res.status(404).send({
                status: "Error",
                message: `Controller: No se encontraron carritos.`
            })
        }
        res.send({ status: "Success", payload: cartsData })
    } catch (error) {
        console.log(error);
    }
}

//GET by ID
export const getCartByIdController = async (req,res) => {
    try {
        let {cartId} = req.params;
        const cartById = await getCartByIdService(cartId);
        if (!cartById) {
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se encontro el carrito con el id: ${cartId}`
            })
        }
        res.send({status: "Success", payload: cartById})
    } catch (error) {
        console.log(error);
    }
}

//POST
export const createCartController = async (req,res) => {
    try {
        let newCart = await createCartService(req.boby)
        if(!newCart) {
            return res.status(404).send({
                status: "Error",
                message: `Controller: No se pudo crear el carrito.`
            })
        }
        return res.status(201).json({status:"Success", payload:newCart})
    } catch (error) {
        console.log(error);
    }
}

//PUT
export const updateCartController = async (req,res) => {
    try {
        let {cartId} = req.params;
        let updateCart = req.body;
        if(!cartId) {
            return res.status(404).send({status:"Error", message: `Controller: No se encontro el carrito con el ID:${pid}`})
        }
        const updatedCart = await updateCartService(cartId,updateCart)
        return res.status().send({message:"Controller: Producto actualizado con exito", payload: updatedCart})
    } catch (error) {
        console.log(error);
    }
}

//DELETE
export const deleteCartController = async (req,res) => {
    try {
        let {cartId} = req.params;
        if(!cartId) {
        return res.status(404).send({
            status: "Error",
            message: `Controller: No se encontro el carrito con el ID: ${cartId}`
        })
        }
        const deletedCart = await deleteCartService(cartId)
        return res.status(200).json({status: "Success", payload: deletedCart})
    } catch (error) {
        console.error("Error en deleteCartController:", error);
        return res.status(500).send({
            status: "Error",
            message: "Hubo un problema al eliminar el carrito"
        });
    }
}
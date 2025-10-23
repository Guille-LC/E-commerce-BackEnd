import { createCartService, deleteCartService, getCartByIdService, getCartsService, purchaseService, updateCartService } from "../service/carts.service.js";
import { filmsModel } from "../models/products.models.js";
import {ticketModel} from "../models/tickets.models.js";
import { v4 as uuidv4 } from 'uuid';

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

export const purchaseController = async (req,res) => {
    try {
        const {cid} = req.params;
        const {email} = req.body;
        const cart = await purchaseService(cid)
        
        if(!cart) return res.status(400).send({ status: "Error", message: `No existe carrito con el ID: ${cid}` });
        if(!email) return res.status(400).send({ status: "Error", message: "Debe enviar un email en el body" });
        if(!cart.products.length || cart.products.length === 0) return res.status(400).send({ status: "Error", message: "El carrito está vacío" });

        let amount = 0;
        let purchasedProducts = [];
        let failedProducts = [];

        for (let item of cart.products) {
            const product = await filmsModel.findById(item.productId._id);
            if(!product) {
                failedProducts.push({ productId: item.productId._id, requestedQty: item.quantity, availableStock: 0 })
                continue;
            }
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();
                amount += product.price * item.quantity
                purchasedProducts.push({
                    productId: product._id,
                    quantity: item.quantity,
                    priceAtPurchase: product.price
                })
            } else {
                failedProducts.push({
                productId: product._id,
                requestedQty: item.quantity,
                availableStock: product.stock
                });
            }
        }
        const newTicket = await ticketModel.create({
            code: uuidv4(),
            purchase_datetime: new Date(),
            amount,
            purchaser: email,
            products: purchasedProducts
        });
        cart.products = failedProducts.map(fp => ({
            productId: fp.productId,
            quantity: fp.requestedQty
            }));
        
        if(failedProducts.length >= 1 && purchasedProducts.length === 0) {
            return res.status(400).send({ status: "Error", message: "Estos productos no tienen stock" });
        }

        await cart.save();
        res.send({
            status: "Success",
            ticket: newTicket,
            failedProducts
        });
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
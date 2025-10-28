import { Router } from "express";
import { logger } from "../config/logger.js";
import {__dirname} from "../utils.js";
import { cartModel } from "../models/carritos.models.js";
import { filmsModel } from "../models/products.models.js";
const router = Router()

router.post("/addToCart/:cartId/products/:productId", async (req,res) => {
    let {cartId,productId} = req.params;

    const carts = await cartModel.findById(cartId)
    const product = await filmsModel.findById(productId);

    if (!carts) {
        logger.warn(`No existe carrito con id ${cartId}`)
        return res.status(404).send({
            status: "Error",
            message: `No existe carrito con id ${cartId}`
        });
    }

    if (!product) {
        logger.warn(`No existe producto con id ${productId}`)
        return res.status(404).send({
            status: "Error",
            message: `No existe producto con id ${productId}`
        });
    }

    if (!carts.products) carts.products = [];

    const existing = carts.products.find(p => {
        const pid = p.productId._id ? p.productId._id.toString() : p.productId.toString();
        return pid === productId.toString();
    });
    if (existing) {
        existing.quantity++;
    } else {
        carts.products.push({ productId: productId, quantity: 1 });
    }

    const exito = await carts.save();

    if (exito) {
        logger.info(`Producto ${productId} agregado al carrito ${cartId}`)
        res.send({
            status: "Success",
            message: `Producto ${productId} agregado al carrito ${cartId}`,
            payload: carts
        });
    } else {
        logger.warn(`No se pudo guardar el carrito.`)
        res.status(500).send({
            status: "Error",
            message: "No se pudo guardar el carrito."
        });
    }
})

router.post("/carts/:cid/purchase", async (req,res) => {
    try {
        /* const {cid} = req.params;
        const {email} = req.body;
        
        const cart = await cartModel.findById(cid);
        
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
            await cart.save();
        res.send({
            status: failedProducts.length > 0 ? "Partial" : "Success",
            ticket: newTicket,
            failedProducts
        }); */
    } catch (error) {
        console.log(error);
    }
})

export default router;
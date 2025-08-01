import mongoose from "mongoose";

const cartsCollection = "carritos";

const cartSchema = new mongoose.Schema({
    productsArray: [
        {
            productId: String,
            quantity: Number,
            index: true
        }
    ]
})

export const cartModel = mongoose.model(cartsCollection,cartSchema);
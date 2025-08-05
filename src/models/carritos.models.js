import mongoose from "mongoose";

const cartsCollection = "carritos";

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "peliculas",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

cartSchema.pre('find', function() {
    this.populate('products.productId')
})

export const cartModel = mongoose.model(cartsCollection,cartSchema);
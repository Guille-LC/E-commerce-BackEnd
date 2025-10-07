import mongoose, { Schema } from "mongoose";

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
    code: {
    type: String,
    unique: true,
    required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    products: [
        {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "peliculas",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        priceAtPurchase: {
            type: Number,
            required: true
        }
        }
    ]
});

export const ticketModel = mongoose.model(ticketCollection,ticketSchema);
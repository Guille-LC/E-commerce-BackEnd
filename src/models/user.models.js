import mongoose, { Schema } from "mongoose";
const usersCollection = 'usuarios';

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        unique:true,
        required:true
    },
    role: {
        type: String,
        default: "user",
        required: true
    },
    pets: { type: Array, default: [] },
    password: String,
    loggedBy: String,
    cartId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "carritos" 
    }
})

export const userModel = mongoose.model(usersCollection,userSchema)
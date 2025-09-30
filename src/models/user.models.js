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
        required:true
    },
    password: String,
    loggedBy: String
})

export const userModel = mongoose.model(usersCollection,userSchema)
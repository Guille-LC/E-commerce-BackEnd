import mongoose, { Schema } from "mongoose";

const filmsCollection = 'peliculas';

const filmsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String
})

export const filmsModel = mongoose.model(filmsCollection,filmsSchema);
import mongoose, { Schema } from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2";

const filmsCollection = 'peliculas';

const filmsSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String
})

filmsSchema.plugin(mongoosePaginate)
export const filmsModel = mongoose.model(filmsCollection,filmsSchema);
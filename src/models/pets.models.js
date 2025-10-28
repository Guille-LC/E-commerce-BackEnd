import mongoose from "mongoose";
const petsCollection = "pets";

const petsSchema = new mongoose.Schema({
    name: String,
    specie: String
})

export const petModel = mongoose.model(petsCollection,petsSchema)
import mongoose from "mongoose";
import config from "./config.js";

export default class MongoDBSingleton {

    static #instance = null

    constructor() {
        this.#connectMongoDB()
    }

    static async getInstance() {
        if(!this.#instance) {
            this.#instance = new MongoDBSingleton()
        } else {
            console.warn("Ya existe una instancia de Singleton!");
            return this.#instance
        }
    }

    #connectMongoDB= async() => {
        try {
            console.log('DB: ', config.mongoUrl);
            await mongoose.connect(config.mongoUrl);
            console.log("¡Conectado a la base de datos de Mongo!");
        } catch (error) {
            console.error(`No se pudo conectar a la base de datos: ${error}`);
            process.exit()
        }
    }
}
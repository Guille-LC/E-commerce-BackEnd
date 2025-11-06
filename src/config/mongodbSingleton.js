import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "./logger.js";

export default class MongoDBSingleton {

    static #instance = null

    constructor() {
        this.#connectMongoDB()
    }

    static async getInstance() {
        if(!this.#instance) {
            this.#instance = new MongoDBSingleton()
        } else {
            logger.warn("Ya existe una instancia de Singleton!");
            return this.#instance
        }
    }

    #connectMongoDB= async() => {
        try {
            await mongoose.connect(config.mongoUrlTest);
            logger.info("Singleton: ¡Conectado a la base de datos de Mongo!");
        } catch (error) {
            logger.error(`No se pudo conectar a la base de datos: ${error}`);
            process.exit()
        }
    }
}
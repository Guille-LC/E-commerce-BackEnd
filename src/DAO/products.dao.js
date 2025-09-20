import { filmsModel } from "../models/products.models.js";

export default class ProductsDAO {
    async getAll() {
        return await filmsModel.find()
    }

    async getById(pid) {
        return await filmsModel.findById(pid)
    }

    async postProduct(productsData) {
        return await filmsModel.create(productsData)
    }

    async putProduct(pid,updateData) {
        return await filmsModel.findByIdAndUpdate(
            pid,
            updateData,
            { new: true }
        );
    }

    async deleteProduct(pid) {
        return await filmsModel.deleteOne(pid)
    }
}
import { cartModel } from "../models/carritos.models.js";

export default class CartsDAO {
    async getAll() {
        return await cartModel.find()
    }

    async getById(cartId) {
        return await cartModel.findById(cartId)
    }

    async createNewCart(cartData) {
        return await cartModel.create(cartData)
    }

    async updateCart(cartId,updateCart) {
        return await cartModel.updafindByIdAndUpdateteOne(
            cartId,
            updateCart,
            {new: true}
        )
    }

    async deleteCart(cartId) {
        return await cartModel.deleteOne({ _id: cartId })
    }
}
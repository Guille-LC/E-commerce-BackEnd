import CartsDAO from "../DAO/carts.dao.js";

const cartsModel = new CartsDAO();

export const getCartsService = async() => {
    return await cartsModel.getAll();
}

export const getCartByIdService = async(cartId) => {
    return await cartsModel.getById(cartId)
}

export const createCartService = async(cartData) => {
    return await cartsModel.createNewCart(cartData)
}

export const updateCartService = async(cartId,updateCart) => {
    return await cartsModel.updateCart(cartId,updateCart)
}

export const deleteCartService = async (cartId) => {
    return await cartsModel.deleteCart(cartId)
}
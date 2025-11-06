import UsersDAO from "../DAO/users.dao.js";

const usersModel = new UsersDAO();

export const getAllUsersService = async() => {
    return await usersModel.getAll();
}

export const getUserByIdService = async (id) => {
    return await usersModel.getById(id);
}

export const createUserService = async (userData) => {
    return await usersModel.createUser(userData)
}

export const updateUserService = async (id,updateData) => {
    return await usersModel.putUser(id,updateData)
}

export const deleteUserWithIdService = async (id) => {
    return await usersModel.deleteUser(id)
}
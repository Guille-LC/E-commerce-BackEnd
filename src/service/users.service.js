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
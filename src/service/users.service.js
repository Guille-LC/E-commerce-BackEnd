import UsersDAO from "../DAO/users.dao";

const usersModel = new UsersDAO();

export const getAllUsersService = async() => {
    return await usersModel.getAll();
}

export const getUserByIdService = async (id) => {
    return await usersModel.getById(id);
}
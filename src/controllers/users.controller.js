import { logger } from "../config/logger.js"
import { getAllUsersService, getUserByIdService, createUserService } from "../service/users.service.js";

export const getAllUsersController = async (req,res) => {
    try {
        const allUsersData = await getAllUsersService();
        if(!allUsersData) {
            return res.status(404).send(({
                status: "Error",
                message:'Controller: No se encontraron usuarios.'
            }))
        }
        return res.status(200).send({
            status: "Success",
            payload: allUsersData
        });
    } catch (error) {
        logger.error('Controller: No se pudo obtener los usuarios: ' + error)
    }
}

export const getUserByIdController = async (req,res) => {
    try {
        let {id} = req.params;
        const userDataWithId = await getUserByIdService(id);
        if (!userDataWithId) {
            return res.status(404).send({
                status: "Error",
                message:'Controller: No se encontro al usuario con ID: ' + id
            })
        }
        res.send({status: "Success", payload: userDataWithId})
    } catch (error) {
        logger.error('Controller: No se pudo obtener el usuario: ' + error)
    }
}

export const createUserController = async (req,res) => {
    try {
        const newUser = await createUserService(req.body);
        return res.status(201).json({
            message: 'Usuario creado con exito',
            payload: newUser
        })
    } catch (error) {
        logger.error('Controller: No se pude crear el usuario: ' + error);
        return res.status(500).json({ error: "Controller: Error al crear el usuario" });
    }
}
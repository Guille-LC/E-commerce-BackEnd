import { logger } from "../config/logger"
import { getAllUsersService, getUserByIdService } from "../service/users.service";

export const getAllUsersController = async (req,res) => {
    try {
        const allUsersData = await getAllUsersService();
        if(!allUsersData) {
            return res.status(404).send(({
                status: "Error",
                message:'Controller: No se encontraron usuarios.'
            }))
        }
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
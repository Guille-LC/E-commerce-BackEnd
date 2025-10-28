import { logger } from "../config/logger.js";
import { generateMockUser,generateMockPet } from "../fackermocks.js";
import { petModel } from "../models/pets.models.js";
import { userModel } from "../models/user.models.js";

export const mocksController = async (req,res) => {
    try {
            let mockUsersArray = [];
            for (let i = 0; i < 50; i++) {
                mockUsersArray.push(generateMockUser())
            }
            res.send({status: "Success", payload: mockUsersArray})
        } catch (error) {
            logger.error(error)
            res.status(500).send({ status: "error", message: "Error generando mocks" });
        }
}

export const generateDataController = async (req,res) => {
    try {
        const {users = 0, pets = 0} = req.body;
        if(isNaN(users) || isNaN(pets)) return res.status(400).send({ status: "error", message: "Los parámetros deben ser numéricos" });

        const mockUsers = [];
        const mockPets = [];   

        for (let i = 0; i < users; i++) {
            mockUsers.push(generateMockUser());
        }

        for (let i = 0; i < pets; i++) {
            mockPets.push(generateMockPet());
        }

        await userModel.insertMany(mockUsers);
        await petModel.insertMany(mockPets);

        res.send({
            status: "Success",
            message: `Se generaron ${users} usuarios y ${pets} mascotas correctamente`
        });
    } catch (error) {
        logger.error(error)
        res.status(500).send({ status: "Error", message: "Error generando data mock" });
    }
}
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from "../controllers/users.controller.js";
import { Router } from "express";
const router = Router();

router.get('/all', getAllUsersController)

router.get('/:id', getUserByIdController)

router.post('/createuser', createUserController)

router.put('/:id', updateUserController)

router.delete('/:id', deleteUserController)

export default router;
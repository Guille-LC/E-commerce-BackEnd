import { getAllUsersController, getUserByIdController, createUserController } from "../controllers/users.controller.js";
import { Router } from "express";
const router = Router();

router.get('/all', getAllUsersController)

router.get('/:id', getUserByIdController)

router.post('/createuser', createUserController)

export default router;
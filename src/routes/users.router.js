import { getAllUsersController, getUserByIdController } from "../controllers/users.controller";
import { Router } from "express";
const router = Router();

router.get('/', getAllUsersController)

router.get('/:id', getUserByIdController)
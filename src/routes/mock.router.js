import { mocksController,generateDataController } from "../controllers/mocks.controller.js";
import { Router } from "express";
const router = Router();

//Mock de users
router.get("/mockingusers", mocksController)

router.post('/mockingpets', generateDataController)

export default router;
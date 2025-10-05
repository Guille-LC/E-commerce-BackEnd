import { generateMockUser } from "../fackermocks.js";
import { Router } from "express";
const router = Router();

//Mock de users
router.get("/:quant", async (req,res) => {
    try {
        const quantity = parseInt(req.params.quant, 10);
        let mockUsersArray = [];
        for (let i = 0; i <= quantity; i++) {
            mockUsersArray.push(generateMockUser())
        }
        res.send({status: "Success", payload: mockUsersArray})
    } catch (error) {
        console.log(error);
    }
})

export default router;
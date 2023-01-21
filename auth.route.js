import { Router } from "express";
import {register, getUser, login} from "./auth.controller.js"
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import {registerValidation} from "./validatios/index.js"
const router = Router();

router.post("/register",registerValidation, register);
router.post('/login', login);
router.get('/users', roleMiddleware(["ADMIN"]), authMiddleware, getUser);

export default router 
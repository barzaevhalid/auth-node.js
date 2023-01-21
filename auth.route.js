import { Router } from "express";
import {register, getUser, login} from "./auth.controller.js"
import { check } from "express-validator";
import {registerValidation} from "./validatios/index.js"
const router = Router();

router.post("/register",registerValidation, register);
router.post('/login', login);
router.get('/users', getUser);

export default router 
import { body } from "express-validator";

export const registerValidation = [
  body('username', "Имя слишко короткое").isLength({min: 3}),
  body('password', "Пароль слишком короткий").isLength({min: 3}),
]
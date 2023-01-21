import User from "./models/User.js";
import Role from "./models/Role.js";
import {secretKey} from "./config.js"
import bcrypt  from 'bcrypt';
import { validationResult } from "express-validator";
import jwt  from "jsonwebtoken";
export const register = async (req, res) => {
    try  {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const {username, password} = req.body;
        const candidate = await User.findOne({username});
    
        if(candidate) {
            return res.status(400).json({message: "Пользователь с таким именем уже существует"})
        };
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)   
        const userRole = await Role.findOne({value: "ADMIN"})
        console.log(salt, 'salt')
        const user = new User({username, password: passwordHash, roles: [userRole.value]})
        user.save();
        return res.json({message: 'Пользователь успешно зарегистрирован'})
    } catch(e) {
        console.log(e);
        res.status(400).json({message: "Registration error" })
    }
}
export const login = async (req, res) => {
    try  {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({message: `Пользователь ${user} не найден`})
        };
        const isValidPassword =  bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(400).json({message: 'Введен неверный пароль'});
        };
        const token = jwt.sign({
            id: user._id,
            roles: user.roles
        }, secretKey.secret, {expiresIn: "24h"})
        return res.json({...user._doc,token})
    } catch(e) {  
        console.log(e);
        res.status(400).json({message: "Login error" })
    }
}
export const getUser = async (req, res) => {
    try  {
           const users = await User.find();
           res.json(users)
    } catch(e) {
        console.log(e);
    }
}
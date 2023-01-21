import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js';
export default function(roles) {
  return function(req, res, next) {
    if(req.method == "OPTIONS") {
      next();
    }
  
    try {
      const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
      console.log(req.headers.authorization);
      if(!token) {
        return res.status(403).json({message: "Пользователь не авторизован"})
      };

     const {roles: userRoles} = jwt.verify(token, secretKey.secret);
    
     let hasRole = false;
     userRoles.forEach(role => {
      if(roles.includes(role)) {
        hasRole = true;
      }
     });
      if(!hasRole) {
        return res.status(403).json({message: "У вас нет доступа", userRoles})
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({message: "Пользователь не авторизован"})
    }
  }
}
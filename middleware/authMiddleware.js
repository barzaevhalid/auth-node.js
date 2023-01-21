import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js';
export default  function(req, res, next) { 
  if(req.method == "OPTIONS") {
    next();
  }

  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log(token)
    if(!token) {
      return res.status(403).json({message: "Пользователь не авторизован"})
    }
    const decodeTokenData = jwt.verify(token, secretKey.secret);
    req.user = decodeTokenData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: "Пользователь не авторизован"})
  }
}
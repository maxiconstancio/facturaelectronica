import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const jwtSecret = process.env.JWT_SECRET;


const createToken = async (id, permissionLevel) => {
  
   const expiresIn = (permissionLevel == 7) ? {expiresIn: (60 * 60 *2 )} : null;
   
    
    if (!id) return res.status(401).json("Invalid ID");
    try {
      
      return jwt.sign({  id, permissionLevel }, jwtSecret,  expiresIn );

    } catch (error) {

      return new Error(error);

    }

  
};


const  verifyToken = async (token) => {
  if (!token) return new Error('Invalid token');
  try {
    return jwt.verify(token, jwtSecret, {});  
  } catch (error) {
    return new Error('Token Error');
  }
  
};

export default { createToken, verifyToken };

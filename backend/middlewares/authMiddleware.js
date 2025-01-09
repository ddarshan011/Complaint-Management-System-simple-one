// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
// export const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Not authenticated' });

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret_key');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET;
export const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
  }

  try {
    console.log('Received token:',token);
    
    const decoded = jwt.verify(token, SECRET);
    console.log("effe***",decoded);
    req.user = decoded;  // Attach user info to request
    
    next();  // Move to the next middleware or route handler

  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
};



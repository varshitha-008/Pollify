


import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';

export const protect = (req, res, next) => {

  let token;
//   const {token}=req.body;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// export default  protect ;


export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// // import jwt from 'jsonwebtoken';

// // const authenticateToken = (req, res, next) => {
// //   const authHeader = req.headers['authorization'];
// //   const token = authHeader && authHeader.split(' ')[1];

// //   if (token == null) return res.sendStatus(401); // No token provided

// //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
// //     if (err) return res.sendStatus(403); // Invalid token
// //     req.user = user;
// //     next();
// //   });
// // };

// // export default authenticateToken;
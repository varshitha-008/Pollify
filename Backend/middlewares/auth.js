import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Token is not present or not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "This is not a valid token" });
        } else {
            req.user = decoded;
            next();
        }
    });
};

export default protect;

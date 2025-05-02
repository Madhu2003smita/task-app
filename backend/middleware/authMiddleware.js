import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    try {
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                message: 'Token not present or improperly formatted',
            });
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }
        
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

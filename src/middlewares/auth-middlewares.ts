import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const tokenSecret = process.env.TOKEN_SECRET || 'exampletoken';
        const decodedToken = jwt.verify(token, tokenSecret) as DecodedToken;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { IJwtPayload } from "../interfaces/interfaces";

dotenv.config();

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token saknas' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token finns inte i headern' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET är inte definierat');
        }
        const decoded = jwt.verify(token, secret) as IJwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Ogiltig token' });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Åtkomst nekad, admin-behörighet' });
    }
};
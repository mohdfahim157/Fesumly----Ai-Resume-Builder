import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { blacklistModel } from "../models/blacklist.model.js";

export default async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }

        const isTokenBlacklisted = await blacklistModel.findOne({ token });
        if (isTokenBlacklisted) {
            res.status(401).json({ message: "Access denied. Token is blacklisted." });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (err) {
                res.status(403).json({ message: "Invalid or expired token." });
                return;
            }
            if (decoded && typeof decoded === 'object') {
                req.user = { id: decoded.id, username: decoded.username }; 
            }
            next();
        });
    } catch (error) {
        next(error);
    }
}
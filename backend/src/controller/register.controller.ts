import type { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function registerUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "Please provide username, email, and password" });
            return;
        }

        const isUserAlreadyExists = await userModel.findOne({ $or: [{ username }, { email }] });
        if (isUserAlreadyExists) {
            res.status(400).json({ message: "User already exists with this username or email" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: hashedPassword
        });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: "1d" });

        await user.save();
        
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email },
            token
        });
    } catch (error) {
        interface MongoError extends Error {
            code?: number;
        }
        
        if ((error as MongoError).code === 11000) {
             res.status(400).json({ message: "Account already exists with this username or email" });
             return;
        }
        next(error);
    }
}
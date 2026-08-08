import type { Request, Response, NextFunction } from "express";
import { blacklistModel } from "../models/blacklist.model.js";

export default async function logoutUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token: string | undefined = req.cookies?.token;
        if (token) {
            await blacklistModel.create({ token });
            res.clearCookie("token");
            res.status(200).json({ message: "Logout successful" });
            return;
        }
        res.status(400).json({ message: "No token found in cookies" });
    } catch (error) {
        next(error);
    }
}

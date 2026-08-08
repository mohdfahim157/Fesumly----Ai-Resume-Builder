import type { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.model.js";

export default async function getUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = req.user?.id; // Uses the extended Express.Request type

        if (!userId) {
            res.status(401).json({ message: "Unauthorized. User ID not found in token." });
            return;
        }

        const user = await userModel.findById(userId).select("-password"); // Exclude password from the response

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

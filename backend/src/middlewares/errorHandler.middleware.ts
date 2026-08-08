import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    console.error("Global Error Handler:", err);

    interface AppError extends Error {
        status?: number;
    }
    const appErr = err as AppError;

    const statusCode = appErr.status || 500;
    const message = process.env.NODE_ENV === "production" 
        ? "Internal Server Error" 
        : appErr.message || "Unknown error";

    res.status(statusCode).json({ message });
}

import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    try {
        // Login logic
const result = await authService.loginUserIntoDB(req.body);

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const authController = {
    loginUser
};
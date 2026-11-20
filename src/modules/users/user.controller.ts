import type { Request, Response } from "express";
import { pool } from "../../db/data.js";
import { userService } from "./user.service.js";


const createUser = async (req: Request, res: Response) => {
    try {

      const result =await userService.createUserIntoDB(req.body)

        res.status(201).json({
            success: true,
            message: "User Created Successfully!",
            data: result.rows[0]
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });

    }
}

export const userController = {
    createUser
}
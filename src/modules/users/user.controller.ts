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

const getAllUsers = async (req: Request, res: Response) => {
    try {
const result = await userService.getAlluserFromDB();

if(result.rowCount === 0) {
  
  res.status(404).json({
            success: false,
            message: "User not Found",
          //  data: result.rows[0]
        });
    }


        res.status(200).json({
            success: true,
            message: "Users Retrieved Successfully!",
            data: result.rows
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });

    }
}

const getSingleUserFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // req.params.id
   

    const result = await userService.singleUserFromDB(id as string);
    // console.log(result);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
}

const updatedUser =async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

const result = await userService.updatedUserFromDB(req.body,id as string);


        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully!",
            data: result.rows[0]
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

const deleteUser = async(req:Request,res:Response) =>{

try {
const {id} = req.params

const result = await userService.deleteUserFromDB(id as string);

if(result.rowCount === 0) {
  
  res.status(404).json({
            success: false,
            message: "User not Found",
          //  data: result.rows[0]
        });
    }
  res.status(200).json({
            success: true,
            message: "User delete Successfully!",
            data: result.rows[0]
        });
//console.log(result)

} catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export const userController = {
    createUser,getAllUsers,getSingleUserFromDB,updatedUser,deleteUser,
}
import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router()


// Create New User
router.post("/", userController.createUser);


// All User Info
router.get("/",userController.getAllUsers);

//Single User 

router.get("/:id",userController.getSingleUserFromDB );

// Updated user

// PUT Method
router.put("/:id",userController.updatedUser);


// Delete User

router.delete("/:id",userController.deleteUser);

export const userRoute = router;
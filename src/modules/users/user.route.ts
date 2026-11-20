import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router()


// Create New User
router.post("/", userController.createUser);


export const userRoute = router
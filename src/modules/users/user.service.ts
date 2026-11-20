
import { pool } from "../../db/data.js";
import type { IUser } from "./user.interface.js";

const createUserIntoDB = async (payLoad:IUser) =>{

        const { name, email, age, password } = payLoad;

        const result = await pool.query(`
            INSERT INTO users(name, email, password, age)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [name, email, password, age]);
        return result;
}
 
export const userService ={
    createUserIntoDB,
}
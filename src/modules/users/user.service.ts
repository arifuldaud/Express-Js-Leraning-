
import { AsyncLocalStorage } from "async_hooks";
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
 
const getAlluserFromDB = async() =>{

        const result = await pool.query(`
            SELECT * FROM users
        `);
return result;
}

const singleUserFromDB = async(id:string) =>{

 const result = await pool.query(
      `
    SELECT * FROM users WHERE id=$1  
      `,
      [id],
    );
return result;
}

const updatedUserFromDB = async (payLoad: Partial<IUser>, id: string) => {
    const { name, password, age, is_active } = payLoad;

    const result = await pool.query(`
        UPDATE users SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_active = COALESCE($4, is_active),
            updated_at = NOW()
        WHERE id = $5
        RETURNING id, name, email, age, is_active, created_at, updated_at
    `, [
        name ?? null,
        password ?? null,
        age ?? null,
        is_active ?? null,
        id
    ]);

    return result;
};

const deleteUserFromDB = async(id:string) =>{

const result = await pool.query(`
    DELETE FROM users
    WHERE id = $1
    
    `,[id],
 
);
   return result
}
export const userService ={
    createUserIntoDB,getAlluserFromDB,singleUserFromDB,updatedUserFromDB,deleteUserFromDB,
}
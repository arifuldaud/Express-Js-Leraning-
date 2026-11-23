import { pool } from "../../../db/data";


const loginUserIntoDB =async (payLoad:{email:string;password:string}) =>{



const {email,password} =payLoad;

const user =pool.query(`
    SELECT * FROM users WHERE email = $1
    `,[email])
}

console.log(user.rows[0]);

export const authService = {
    loginUserIntoDB
}

import bcrypt from "bcryptjs";
import { pool } from "../../../db/data.js";

const loginUserIntoDB = async (
    payLoad: { email: string; password: string }
) => {
    const { email, password } = payLoad;

    const user = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    console.log(user.rows[0]);

    if (user.rowCount === 0) {
        throw new Error("Invaild Credentials");
    }

   const matchPassword=await bcrypt.compare(password,user.rows[0].password)


  if (!matchPassword) {
        throw new Error("Invaild Credentials");
    }

//console.log(!user.rows[0].is_Active)
     if (!user.rows[0].is_active) {
        throw new Error("Access Denied");
    }

};

export const authService = {
    loginUserIntoDB
};

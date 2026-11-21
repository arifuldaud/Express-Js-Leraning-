import config  from "../config/index.js";
import { Pool } from "pg";


export const pool = new Pool({
    connectionString: config.connection_string,
})
//console.log(pool)

export const initDB = async() =>{
    try {
        await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255),
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NUll,
         age INT,
         is_Active BOOLEAN DEFAULT true,

         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()
         
         )`);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(15),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);


        console.log("Database Conecnted !");
    } catch (error) {
       console.log(error) 
    }
}

import config  from "./config/index.js";
import express, { type Application, type Response,type Request, urlencoded, application } from 'express';
import { pathToFileURL } from 'node:url';
import  {Pool} from "pg";

const app : Application = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))

const pool = new Pool({
    connectionString: config.connection_string,
})
//console.log(pool)


const initDB = async() =>{
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

        console.log("Database Conecnted !");
    } catch (error) {
       console.log(error) 
    }
}


initDB();

app.get('/', (req:Request, res:Response) => {
 // res.send('Hello World!')
console.log(req)
  res.status(200).json({ 
    success: "True",
    message:"this is home",
    author : "DaudBD",
    age : 20
    });
});

 // Create New User
app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {

        const { name, email, age, password } = req.body;

        const result = await pool.query(`
            INSERT INTO users(name, email, password, age)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [name, email, password, age]);

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
});


// All User Info
app.get("/api/v1/users", async (req: Request, res: Response) => {
    try {

        const result = await pool.query(`
            SELECT * FROM users
        `);

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
});


// Sinngle User Info 


// PUT Method
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const { name, password, age, is_active } = req.body;

        const result = await pool.query(`
            UPDATE users SET
                name = COALESCE($1, name),
                password = COALESCE($2, password),
                age = COALESCE($3, age),
                is_active = COALESCE($4, is_active),
                updated_at = NOW()
            WHERE id = $5
            RETURNING *
        `, [
            name ?? null,
            password ?? null,
            age ?? null,
            is_active ?? null,
            id
        ]);

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
});

// User Delete

app.delete("/api/v1/users/:id",async(req:Request,res:Response)=>{

try {
const {id} = req.params

const result = await pool.query(`
    DELETE FROM users
    WHERE id = $1
    
    `,[id])

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

})



// Server Listen
app.listen(config.port, () => {
    console.log(`The Express Server is running ${config.port}`);
});



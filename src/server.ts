import express, { type Application, type Response,type Request, urlencoded } from 'express';
import  {Pool} from "pg";
const app : Application = express()
const port = 3000
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_DRtQ5K4ixjNH@ep-summer-rice-bizbiobc-pooler.c-5.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
})
//console.log(pool)


const initDB = async() =>{
    try {
        await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255),
         email VARCHAR(255) NOT NULL,
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

app.post("/api/v1/users",async(req:Request,res:Response)=>{
//console.log(req.body)

const {name,age,password} =req.body;

//console.log(password);
 res.status(200).json({ 
    success: "true",
    message:"this is Test Api !",
    data :  {name,age}
    });


});
app.listen(port, () => {
  console.log(`The Express Server is running ${port}`)
});
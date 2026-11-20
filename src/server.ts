import express, { type Application, type Response,type Request } from 'express';

const app : Application = express()
const port = 5000
app.use(express.json());
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

app.post("/",async(req:Request,res:Response)=>{
console.log(req.body)
});
app.listen(port, () => {
  console.log(`The Express Server is running ${port}`)
});
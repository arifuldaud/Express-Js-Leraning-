import config  from "./config/index.js";
import express, { type Application, type Response,type Request, urlencoded, application } 
from 'express';
import { pathToFileURL } from 'node:url';

import {  pool } from "./db/data.js";
import { userRoute } from "./modules/users/user.route.js";

const app : Application = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))

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

app.use("/api/v1/users",userRoute);

export default app;

// Server Listen
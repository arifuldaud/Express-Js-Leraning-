import type { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
   // console.log("This Is a Protected Route!");
console.log(req.headers);

    next();
};

export default auth; 
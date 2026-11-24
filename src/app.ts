import express, {
    type Application,
    type Response,
    type Request
} from "express";

import { userRoute } from "./modules/users/user.route.js";
import { profileRoute } from "./modules/users/profile/profile.route.js";
import { authRoute } from "./modules/users/auth/auth.route.js";

import fs from "fs"

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application middleware
// Application middleware
app.use((req, res, next) => {

    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`;

    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            console.log("Log Error:", err);
        }
    });

    next();
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is home",
        author: "DaudBD",
        age: 20
    });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

export default app;
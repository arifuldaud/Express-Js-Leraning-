import bcrypt from "bcryptjs";
import { pool } from "../../../db/data.js";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (
    payLoad: { email: string; password: string }
) => {
    const { email, password } = payLoad;

    const user = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const userData = user.rows[0];

    if (!userData) {
        throw new Error("Invalid Credentials");
    }

    const matchPassword = await bcrypt.compare(
        password,
        userData.password
    );

    if (!matchPassword) {
        throw new Error("Invalid Credentials");
    }

    if (!userData.is_active) {
        throw new Error("Access Denied");
    }

    const jwtPayload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    };

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    const accessToken = jwt.sign(jwtPayload, secret, {
        expiresIn: "1d",
    });

    return {
    accessToken,
    user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        is_active: userData.is_active
    }
};
};

export const authService = {
    loginUserIntoDB,
};
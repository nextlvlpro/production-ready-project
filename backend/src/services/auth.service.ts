import bcrypt from "bcrypt";
import { db } from "../db";

export async function createUser(email:string , password:string) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    try {
        let crateUserQuery = "INSERT INTO users (email,password_hash) VALUES ($1,$2) RETURNING id, email"
        const result = await db.query(crateUserQuery, [email, passwordHash])

        return result.rows[0];
    } catch (err:any) {
        if (err.code === "23505") {
            const e = new Error("User Already Exists");
            (e as any).code = "USER_EXISTS"
            throw e;
        }

        throw err;
        
    }
}


export async function authenticateUser(email:string , password:string) {
    const authUserQuery = "SELECT id, email, password_hash FROM users WHERE email = $1"

    const result = await db.query(authUserQuery, [email])

    if (!result?.rows[0]) {
        const e = new Error("User Not Found");
        (e as any).code = "USER_NOT_FOUND"
        throw e;
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
        const e = new Error("Invalid Password");
        (e as any).code = "INVALID_PASSWORD"
        throw e;
    }

    return {
        id: user.id,
        email: user.email,
    };
}
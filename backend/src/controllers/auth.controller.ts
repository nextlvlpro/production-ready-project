import { Request, Response } from "express";
import { authenticateUser, createUser } from "../services/auth.service";
import jwt from "jsonwebtoken";
import { env } from "../config/env";


export async function signupController(req: Request, res: Response) {
    const { email, password } = req.body as { email: string, password: string }

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" })
    }

    try {
        const user = await createUser(email, password)
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
        },
            env.jwtSecret,
            { expiresIn: "1h" }
        )

        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        })
    } catch (err: any) {
        if (err.code === "USER_EXISTS") {
            return res.status(409).json({ error: "User already exists" })
        }

        console.error(err)

        return res.status(500).json({ error: "Internal server error" })

    }
}

// login controller

export async function loginController(req:Request, res:Response) {

    const { email, password } = req.body as { email: string, password: string }

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" })
    }

    try {
        const user = await authenticateUser(email, password)
        
        const token = jwt.sign({
            userId:user.id,
            email:user.email
        },
        env.jwtSecret,
        { expiresIn: "1h" }
    )

    return res.status(200).json({
        user: {
            id: user.id,
            email: user.email,
        },
        token,
    })

    } catch (err:any) {
        if (err.code === "USER_NOT_FOUND") {
            return res.status(404).json({ error: "User not found" })
        }

        if (err.code === "INVALID_PASSWORD") {
            return res.status(401).json({ error: "Invalid password" })
        }

        console.error(err)

        return res.status(500).json({ error: "Internal server error" })
    }
    
}
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validateUser } from '../services/auth';

const db = new PrismaClient()

const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { token } = req.body

        const user = await validateUser(token);

        const dbUser = await db.user.upsert({
            where: { id: user.id },
            update: user,
            create: user
        });

        res.status(201);
        res.json(dbUser);
    }
    catch (e: any) {

        console.log(e);

        res.status(401);
        res.send();
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    await req.session.destroy(() => { });
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
}

export default {
    login, logout
};
import { MyShow, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const db = new PrismaClient()

const get = async (req: Request, res: Response, next: NextFunction) => {

    console.log('get shows');
    const shows: MyShow[] = await db.myShow.findMany({
        where: {
            userId: req.user!.id
        }
    });

    res.send(shows);
};

const add = async (req: Request, res: Response, next: NextFunction) => {

    const body: AddShow = req.body;

    const exists: MyShow | null = await db.myShow.findFirst({
        where: {
            showId: body.showId,
            userId: req.user!.id
        }
    });

    if (!exists) {
        await db
            .myShow
            .create({
                data: {
                    showId: body.showId,
                    userId: req.user!.id,
                    watched: false
                }
            });
    }

    res.status(201);
    res.send("Show added successfully");
}

export {
    get,
    add
};

interface AddShow {
    showId: number;
}
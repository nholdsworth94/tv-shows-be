import { PrismaClient, User } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { validateUser } from './services/auth';

//#region Controllers

const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/shows');

//#endregion

const PORT = process.env.SERVER_PORT || 5001;

var app = express();
const db = new PrismaClient()

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header("authentication")?.split(' ')[1];

    if (token) {

        const user = await validateUser(token);

        req.user = user;

    } else {

        res.status(401);
        res.send();
    }

    next()
}

app.use('/auth', authRoutes);
app.use('/shows', authenticate, showRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
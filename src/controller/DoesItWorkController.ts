import { DoesItWorkDTO } from './../validator/DoesItWorkValidators.js';
import { Request, Response } from "express";
import { injectSequelize } from "../service/index.js";
import User from '../model/User.js';
import bcrypt from "bcrypt";
import { v4 } from 'uuid';

class DoesItWorkController {

    async doesItWork(
        req: Request<{}, {}, {}, DoesItWorkDTO>,
        res: Response
    ) {
        const sequel = await injectSequelize();
        await sequel.sync({ alter: true });
        await Promise.all(
            (await User.unscoped().findAll()).map(u => u.destroy())
        );
        await User.create({
            username: "laurcons",
            uuid: v4(),
            password: await bcrypt.hash("1234", 5),
            roles: ["USER", "ADMIN"],
            birthday: new Date(2003, 6, 26),
            pronouns: "he/him/his/his",
            status: "NOT_ACTIVATED"
        });
        await User.create({
            username: "cristina",
            uuid: v4(),
            password: await bcrypt.hash("1234", 5),
            roles: ["USER"],
            birthday: new Date(2003, 6, 26),
            pronouns: "he/him/his/his",
            status: "NOT_ACTIVATED"
        });
        res.json({
            "works": true,
            "are-you-dumb": true,
            "your-name": "hello there general " + req.query.yourName
        });
    }

};

export default new DoesItWorkController();
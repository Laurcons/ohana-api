import { DoesItWorkDTO } from './../validator/DoesItWorkValidators.js';
import { Request, Response } from "express";
import { injectSequelize } from "../service/index.js";
import User from '../model/User.js';
import bcrypt from "bcrypt";

class DoesItWorkController {

    async doesItWork(
        req: Request<{}, {}, {}, DoesItWorkDTO>,
        res: Response
    ) {
        const sequel = (await injectSequelize()).sequelize;
        await sequel.sync({ alter: true });
        await (await User.findAll()).map(u => u.destroy());
        await User.create({
            username: "laurcons",
            password: await bcrypt.hash("1234", 5)
        });
        await User.create({
            username: "cristina",
            password: await bcrypt.hash("1234", 5)
        });
        res.json({
            "works": true,
            "are-you-dumb": true,
            "your-name": "hello there general " + req.query.yourName
        });
    }

};

export default new DoesItWorkController();
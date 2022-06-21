import { DoesItWorkDTO } from './../validator/DoesItWorkValidators.js';
import { Request, Response } from "express";
import { injectSequelize } from "../service/index.js";

class DoesItWorkController {

    async doesItWork(
        req: Request<{}, {}, {}, DoesItWorkDTO>,
        res: Response
    ) {
        const sequel = await injectSequelize();
        await sequel.sync();
        res.json({
            "works": true,
            "are-you-dumb": true,
            "your-name": "hello there general " + req.query.yourName
        });
    }

};

export default new DoesItWorkController();
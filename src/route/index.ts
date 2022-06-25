import express, { NextFunction, Request, Response } from "express";
import DoesItWorkController from "../controller/DoesItWorkController.js";
import asyncWrap from "../lib/asyncWrap.js";
import validate from "../lib/validate.js";
import { DoesItWorkDTO } from "../validator/DoesItWorkValidators.js";

const router = express.Router();

if (process.env.NODE_ENV === "development") {
    router.get("/does-it-work",
        validate({ query: DoesItWorkDTO }),
        asyncWrap(DoesItWorkController.doesItWork)
    );
}
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        "status": "internal-error",
        "error": process.env.NODE_ENV === "development" ? err : undefined,
    });
    console.log(err);
});

export default router;
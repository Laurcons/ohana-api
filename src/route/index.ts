import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import DoesItWorkController from "../controller/DoesItWorkController.js";
import ErrorController from "../controller/ErrorController.js";
import asyncWrap from "../lib/asyncWrap.js";
import validate from "../lib/validate.js";
import { DoesItWorkDTO } from "../validator/DoesItWorkValidators.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/auth", authRouter);

if (process.env.NODE_ENV === "development") {
    router.get("/does-it-work",
        validate({ query: DoesItWorkDTO }),
        asyncWrap(DoesItWorkController.doesItWork)
    );
}

router.use(ErrorController.notFound);
router.use(ErrorController.internalError);

export default router;
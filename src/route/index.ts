import express from "express";
import DoesItWorkController from "../controller/DoesItWorkController.js";
import asyncWrap from "../lib/asyncWrap.js";
import validate from "../lib/validate.js";
import { DoesItWorkDTO } from "../validator/DoesItWorkValidators.js";

const router = express.Router();

router.get("/does-it-work",
    validate({ query: DoesItWorkDTO }),
    asyncWrap(DoesItWorkController.doesItWork)
);

export default router;
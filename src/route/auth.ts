import express from "express";
import AuthController from "../controller/AuthController.js";
import asyncWrap from "../lib/asyncWrap.js";
import authenticated from "../lib/authenticated.js";
import validate from "../lib/validate.js";
import { LoginBodyDTO } from "../validator/AuthValidators.js";

const authRouter = express.Router();

authRouter.post(
    "/login",
    validate({ body: LoginBodyDTO }),
    asyncWrap(AuthController.login)
);

authRouter.post(
    "/logout",
    authenticated("USER"),
    asyncWrap(AuthController.logout),
);

export default authRouter;
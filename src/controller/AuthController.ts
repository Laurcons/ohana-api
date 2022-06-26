import { Request, Response } from "express";
import ApiErrors from "../lib/apiError.js";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import { injectSequelize } from "../service/index.js";
import { LoginBodyDTO } from "../validator/AuthValidators.js";
import jwtp from "../lib/jwtp.js";
import config from "../lib/config.js";
import UserSession from "../model/UserSession.js";
import { DateTime } from "luxon";

class AuthController {

    async login(
        req: Request<{}, {}, LoginBodyDTO>,
        res: Response
    ) {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (user === null)
            throw ApiErrors.auth.loginCredentials("user");
        const matching = await bcrypt.compare(req.body.password, user.password);
        if (!matching)
            throw ApiErrors.auth.loginCredentials("pass");
        // try to find existing session
        const existingSesss = await UserSession.findAll({
            where: {
                userId: user.id
            }
        });
        if (existingSesss.length != 0 &&
            existingSesss.some(s => s.expiresAt.getTime() > new Date().getTime()))
            throw ApiErrors.auth.alreadyLoggedIn();
        await Promise.all(
            existingSesss.map(s => s.destroy())
        );
        // it is successful!
        // generate session
        const sess = UserSession.build({
            userId: user.id,
            expiresAt: DateTime.now().plus({ days: 5 })//.toJSDate()
        });
        sess.save();
        res.json({
            "token": sess.uuid
        });
    }

    async logout(
        req: Request,
        res: Response
    ) {
        await req.session.destroy();
        res.status(200).json({});
    }

};

export default new AuthController();
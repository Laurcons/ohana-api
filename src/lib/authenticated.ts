import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../model/User.js";
import UserSession from "../model/UserSession.js";
import { injectSequelize } from "../service/index.js";
import ApiErrors from "./apiError.js";
import config from "./config.js";
import jwtp from "./jwtp.js";

export default function authenticate(
    roles: string | string[] = "ROLE_USER"
) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (typeof roles === "string")
            roles = [roles];
        const asynch = async () => {
            const authHeader = req.header("authorization");
            if (!authHeader)
                throw ApiErrors.auth.tokenIncorrect();
            const headerParsed = /Bearer ([0-9a-z-]{36})/.exec(authHeader);
            if (headerParsed === null)
                throw ApiErrors.auth.tokenIncorrect();
            const token = headerParsed[1];
            const sess = await UserSession.findOne({ where: { uuid: token } });
            if (sess === null || sess.expiresAt.getTime() < new Date().getTime())
                throw ApiErrors.auth.tokenIncorrect();
            const user = await User.findByPk(sess.userId);
            if (!user)
                throw ApiErrors.auth.tokenIncorrect();
            console.log(`[] User uuid ${user.uuid.substring(0, 6)}..`);
            if (!user.roles.some(role => roles.includes(role))) {
                console.log("  \\-> DENIED");
                throw ApiErrors.auth.permissionDenied();
            }
            req.user = user;
            req.session = sess;
        };
        asynch()
        .then(next)
        .catch(next);
    };
}
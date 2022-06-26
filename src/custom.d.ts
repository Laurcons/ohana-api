import User from "./model/User.js"
import { Request } from "express";
import UserSession from "./model/UserSession.js";

declare global {
    namespace Express {
        export interface Request {
            user: User
            session: UserSession
        }
    }
}
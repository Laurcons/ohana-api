import { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/apiError.js";

class ErrorController {

    notFound = (req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({
            "message": "Resource was not found."
        });
    }

    internalError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            res.status(err.status).json({
                "status": "api-error",
                "code": err.code,
                "message": err.message
            });
        }
        else {
            res.status(500).json({
                "status": "internal-error",
                "error": process.env.NODE_ENV === "development" ? err : undefined,
            });
            console.log(err);
        }
    }

}

export default new ErrorController();
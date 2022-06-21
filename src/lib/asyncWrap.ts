import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export default function asyncWrap<TP, TSB, TQB, TQ, TL extends Record<string, any>>(
    handler: (req: Request<TP, TSB, TQB, TQ, TL>, res: Response<TSB, TL>) => Promise<void>
) {
    return (
        req: Request<TP, TSB, TQB, TQ, TL>,
        res: Response<TSB, TL>,
        next: NextFunction
    ) => {
        handler(req, res)
        .then(() => next())
        .catch((err) => { 
            console.log(chalk.red("Error processing request"));
            next(err);
        });
    };
}
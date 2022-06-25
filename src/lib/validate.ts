import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { SmokeScreen } from "smoke-screen";

interface Constructable < T > {
    new(...args: any[]): T;
}
type ClassesType<TQ, TB, TP> = {
    query?: Constructable<TQ>;
    body?: Constructable<TB>;
    params?: Constructable<TP>;
};

export default function validate<TQuery, TBody, TParams>(classes: ClassesType<TQuery, TBody, TParams>) {
    return (req: Request<TParams, {}, TBody, TQuery>, res: Response, next: NextFunction) => {
        const screen = new SmokeScreen();
        try {
            if (classes.query) {
                screen.fromObject(req.query as any, classes.query);
            }
        } catch (err: any) {
            res.status(422);
            res.json({
                "details": err.message
            });
            if (process.env.NODE_ENV !== "production")
                console.log(chalk.gray("Validation error"));
            return;
        }
        next();
    };
}
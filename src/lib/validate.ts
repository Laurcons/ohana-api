import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { SmokeScreen } from "smoke-screen";

interface Constructable < T > {
    new(...args: any[]): T;
}
interface ClassesType<TQ, TB, TP> {
    query?: Constructable<TQ>;
    body?: Constructable<TB>;
    params?: Constructable<TP>;
};

export default function validate<TQuery, TBody, TParams>(classes: ClassesType<TQuery, TBody, TParams>) {
    return (req: Request<TParams, {}, TBody, TQuery>, res: Response, next: NextFunction) => {
        const screen = new SmokeScreen();
        let whileValidating;
        try {
            // maybe rewrite this ifs in a prettier/less repetitive way?
            // i tried a for..of loop but TS don't like it too much
            if (classes.query) {
                whileValidating = "query";
                screen.fromObject(req.query as any, classes.query);
            }
            if (classes.body) {
                whileValidating = "body";
                screen.fromObject(req.body as any, classes.body);
            }
            if (classes.params) {
                whileValidating = "params";
                screen.fromObject(req.params as any, classes.params);
            }
        } catch (err: any) {
            res.status(422);
            res.json({
                "whileValidating": whileValidating,
                "details": err.message
            });
            if (process.env.NODE_ENV !== "production")
                console.log(chalk.gray("Validation error"));
            return;
        }
        next();
    };
}
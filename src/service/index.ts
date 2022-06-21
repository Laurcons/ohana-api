import chalk from "chalk";
import { SequelizeService } from "./SequelizeService.js";

const injectables: Record<string, any> = {};
let initialized: Promise<void> | null = null;

export async function initializeInjectables() {

    initialized = new Promise<void>((res, rej) => {
        injectables.sequelize = new SequelizeService();
        res();
    });
    initialized.catch(reason => {
        console.log(chalk.red("Couldn't initialize injectable."), reason);
    });
    return initialized;

}

async function getInjectable<T>(key: string) {
    if (initialized === null)
        throw new Error("Injectables not initialized");
    try {
        await initialized;
    } catch (err) {
        throw err;
    }
    if (key in injectables) {
        return injectables[key] as T;
    } else {
        throw new Error("Injectable not found.");
    }
}

export async function injectSequelize() {
    return getInjectable<SequelizeService>("sequelize");
}
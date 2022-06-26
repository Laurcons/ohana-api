import chalk from "chalk";
import { SequelizeService } from "./SequelizeService.js";

const injectables: Record<string, any> = {};

export async function initializeInjectables() {
    try {
        injectables.sequelize = await (async () => {
            const s = new SequelizeService();
            await s.init();
            return s;
        })();
    } catch (reason) {
        console.log(chalk.red("Couldn't initialize injectable."));
        throw reason;
    }
}

function getInjectable<T>(key: string) {
    if (key in injectables) {
        return injectables[key] as T;
    } else {
        throw new Error("Injectable not found.");
    }
}

export function injectSequelize() {
    return getInjectable<SequelizeService>("sequelize");
}
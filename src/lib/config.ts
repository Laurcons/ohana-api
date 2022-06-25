import dotenv from 'dotenv';

class Config {
    constructor() {
        dotenv.config();
    }

    get(key: string): string {
        if (process.env[key])
            return process.env[key] ?? ""; // will never coalesce
        else throw new Error(`Env ${key} not found`);
    }

    tryGet(key: string): string | undefined {
        return process.env[key] ?? undefined;
    }
}

const config = new Config();
export default config;
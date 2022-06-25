import { dirname } from 'path';
import { Sequelize } from "sequelize";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function initModels(sequelize: Sequelize) {
    const files = await fs.readdir(__dirname);
    for (const file of files) {
        if (!/^[A-Z][a-zA-Z]*\.js$/.test(file))
            continue;
        const imported = await import("./" + file);
        imported.registerModel(sequelize);
    }
}
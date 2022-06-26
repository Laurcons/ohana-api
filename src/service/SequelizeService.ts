import Seq, { Transaction } from "sequelize";
import cls from "cls-hooked";
import config from "../lib/config.js";
import { initModels } from "../model/init.js";

const namespace = cls.createNamespace("ohana-api");
Seq.Sequelize.useCLS(namespace);

export class SequelizeService extends Seq.Sequelize {
    constructor() {
        super(
            config.get("DB_STRING"),
            {
                isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
            }
        );
    }

    async init() {
        await initModels(this);
        console.log("Created models", Object.keys(this.models));
        await this.authenticate();
    }

};
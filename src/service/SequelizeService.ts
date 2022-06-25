import Seq, { Transaction } from "sequelize";
import cls from "cls-hooked";
import config from "../lib/config.js";
import { initModels } from "../model/init.js";

const namespace = cls.createNamespace("ohana-api");
Seq.Sequelize.useCLS(namespace);

export class SequelizeService {
    private seq: Seq.Sequelize;

    constructor() {
        this.seq = new Seq.Sequelize(
            config.get("DB_STRING"),
            {
                isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
            }
        );
    }

    async init() {
        await initModels(this.seq);
        console.log("Created models", Object.keys(this.seq.models));
        await this.seq.authenticate();
    }

    get sequelize() {
        return this.seq;
    }
};
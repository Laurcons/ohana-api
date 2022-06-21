import Seq, { Transaction } from "sequelize";
import cls from "cls-hooked";
import config from "../lib/config.js";

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

    async sync() {
        await this.seq.sync({ force: true });
    }
};
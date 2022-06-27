import SeqTS from "sequelize-typescript";
import { Transaction } from "sequelize";
import cls from "cls-hooked";
import config from "../lib/config.js";
import User from "../model/User.js";
import UserSession from "../model/UserSession.js";

const namespace = cls.createNamespace("ohana-api");
SeqTS.Sequelize.useCLS(namespace);

export class SequelizeService extends SeqTS.Sequelize {
    constructor() {
        super(
            config.get("DB_STRING"),
            {
                isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
                models: [User, UserSession]
            }
        );
    }

    async init() {
        console.log("Created models", Object.keys(this.models));
        await this.authenticate();
    }

};
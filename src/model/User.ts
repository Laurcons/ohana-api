import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import UserSession from "./UserSession.js";

class User extends Model {
    declare id: number;
    declare password: string;
    declare uuid: string;
    declare roles: string[];
}

export function registerModel(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: v4
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "user"
    });
};

export default User;
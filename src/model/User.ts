import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";

class User extends Model {
    declare id: number;
    declare password: string;
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
        }
    }, {
        sequelize
    });
};

export default User;
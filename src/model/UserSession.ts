import { DataTypes, Model, Sequelize } from "sequelize";
import { v4 } from "uuid";
import User from "./User.js";

class UserSession extends Model {
    declare id: number;
    declare userId: number;
    declare uuid: string;
    declare expiresAt: Date;
}

export function registerModel(sequelize: Sequelize) {
    UserSession.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: v4
        },
        expiresAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: "userSession"
    });

    UserSession.belongsTo(User);
    User.hasMany(UserSession);
};

export default UserSession;
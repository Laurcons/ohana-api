import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";
import User from "./User.js";

@Table
export default class UserSession extends Model<InferAttributes<UserSession>, InferCreationAttributes<UserSession>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    declare userId: number;
    @BelongsTo(() => User)
    declare user: NonAttribute<User>;

    @Default(v4)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    declare uuid: CreationOptional<string>;

    @AllowNull(false)
    @Column
    declare expiresAt: Date;
}
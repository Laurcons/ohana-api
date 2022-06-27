import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { AllowNull, AutoIncrement, Column, Default, DefaultScope, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";
import UserSession from "./UserSession.js";

export type UserStatus = "ACTIVE" | "PASSWORD_RESET" | "NOT_ACTIVATED";
//export const UserStatuses: UserStatus[] = ["ACTIVE", "PASSWORD_RESET", "NOT_ACTIVATED"];
export type UserRole = "ADMIN" | "USER";
//export const UserRoles: UserRole[] = ["ADMIN", "USER"];

@DefaultScope(() => ({
    where: {
        status: "ACTIVE"
    }
}))
@Table
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Default(v4)
    @AllowNull(false)
    @Column
    declare uuid: string;

    @AllowNull(false)
    @Column
    declare username: string;

    @Default("NOT_ACTIVATED")
    @AllowNull(false)
    @Column(DataTypes.STRING)
    declare status: UserStatus;

    @AllowNull(false)
    @Column
    declare password: string;

    @Default([])
    @AllowNull(false)
    @Column(DataTypes.JSON)
    declare roles: UserRole[];

    @AllowNull(false)
    @Default(new Date(0))
    @Column
    declare birthday: Date;

    @AllowNull(false)
    @Default("he/him/his/his")
    @Column
    declare pronouns: string;

    @HasMany(() => UserSession)
    declare sessions: NonAttribute<UserSession[]>;
}
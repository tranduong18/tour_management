import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(255)
    },
    token: {
        type: DataTypes.STRING(255)
    },
    avatar: {
        type: DataTypes.STRING(500)
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: "active"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    deletedAt: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'accounts',
    timestamps: true, 
});

export default Account;
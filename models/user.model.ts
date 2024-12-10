import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define("User", {
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
    phone: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(255)
    },
    tokenUser: {
        type: DataTypes.STRING(255)
    },
    avatar: {
        type: DataTypes.STRING(500)
    },
    status: {
        type: DataTypes.STRING(20),
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    deletedAt: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'users',
    timestamps: true, 
});

export default User;
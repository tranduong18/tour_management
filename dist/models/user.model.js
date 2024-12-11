"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User = database_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    tokenUser: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    address: {
        type: sequelize_1.DataTypes.STRING(200)
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING(500)
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: "active"
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE
    },
}, {
    tableName: 'users',
    timestamps: true,
});
exports.default = User;

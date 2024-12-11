"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Setting = database_1.default.define("Setting", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    websiteName: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    logo: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    address: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    copyright: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'settings',
    timestamps: true
});
exports.default = Setting;

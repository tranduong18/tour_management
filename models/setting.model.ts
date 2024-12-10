import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Setting = sequelize.define("Setting", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    websiteName: {
        type: DataTypes.STRING(100),
    },
    logo: {
        type: DataTypes.STRING(100),
    },
    email: {
        type: DataTypes.STRING(100)
    },
    phone: {
        type: DataTypes.STRING(100)
    },
    address: {
        type: DataTypes.STRING(100)
    },
    copyright: {
        type: DataTypes.STRING(100)
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'settings',
    timestamps: true 
});

export default Setting;
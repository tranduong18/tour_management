"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const category_route_1 = require("./category.route");
const tour_route_1 = require("./tour.route");
const account_route_1 = require("./account.route");
const auth_route_1 = require("./auth.route");
const user_route_1 = require("./user.route");
const setting_route_1 = require("./setting.route");
const dashboard_route_1 = require("./dashboard.route");
const order_route_1 = require("./order.route");
const system_1 = require("../../config/system");
const authMiddleware = __importStar(require("../../middlewares/admin/auth.middleware"));
const adminRoutes = (app) => {
    const path_admin = `/${system_1.systemConfig.prefixAdmin}`;
    app.use(`${path_admin}/auth`, auth_route_1.authRoutes);
    app.use(`${path_admin}/orders`, authMiddleware.requireAuth, order_route_1.orderRoutes);
    app.use(`${path_admin}/dashboard`, authMiddleware.requireAuth, dashboard_route_1.dashboardRoutes);
    app.use(`${path_admin}/settings`, authMiddleware.requireAuth, setting_route_1.settingRoutes);
    app.use(`${path_admin}/users`, authMiddleware.requireAuth, user_route_1.userRoutes);
    app.use(`${path_admin}/categories`, authMiddleware.requireAuth, category_route_1.categoryRoutes);
    app.use(`${path_admin}/tours`, authMiddleware.requireAuth, tour_route_1.tourRoutes);
    app.use(`${path_admin}/accounts`, authMiddleware.requireAuth, account_route_1.accountRoutes);
};
exports.adminRoutes = adminRoutes;

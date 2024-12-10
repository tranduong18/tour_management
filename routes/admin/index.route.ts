import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { tourRoutes } from "./tour.route";
import { accountRoutes } from "./account.route";
import { authRoutes } from "./auth.route";
import { userRoutes } from "./user.route";
import { settingRoutes } from "./setting.route";
import { dashboardRoutes } from "./dashboard.route";
import { orderRoutes } from "./order.route";

import { systemConfig } from "../../config/system";
import * as authMiddleware from "../../middlewares/admin/auth.middleware";

export const adminRoutes = (app: Express) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;

    app.use(`${path_admin}/auth`, authRoutes);

    app.use(`${path_admin}/orders`, authMiddleware.requireAuth, orderRoutes);

    app.use(`${path_admin}/dashboard`, authMiddleware.requireAuth, dashboardRoutes);

    app.use(`${path_admin}/settings`, authMiddleware.requireAuth, settingRoutes);

    app.use(`${path_admin}/users`, authMiddleware.requireAuth, userRoutes);

    app.use(`${path_admin}/categories`, authMiddleware.requireAuth, categoryRoutes);

    app.use(`${path_admin}/tours`, authMiddleware.requireAuth, tourRoutes);

    app.use(`${path_admin}/accounts`, authMiddleware.requireAuth, accountRoutes);
}
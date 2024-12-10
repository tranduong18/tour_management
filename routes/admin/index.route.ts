import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { tourRoutes } from "./tour.route";
import { accountRoutes } from "./account.route";
import { authRoutes } from "./auth.route";

import { systemConfig } from "../../config/system";
import * as authMiddleware from "../../middlewares/admin/auth.middleware";

export const adminRoutes = (app: Express) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;

    app.use(`${path_admin}/auth`, authRoutes);

    app.use(`${path_admin}/categories`, authMiddleware.requireAuth, categoryRoutes);

    app.use(`${path_admin}/tours`, authMiddleware.requireAuth, tourRoutes);

    app.use(`${path_admin}/accounts`, authMiddleware.requireAuth, accountRoutes);
}
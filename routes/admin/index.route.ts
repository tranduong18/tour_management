import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { tourRoutes } from "./tour.route";
import { accountRoutes } from "./account.route";

import { systemConfig } from "../../config/system";

export const adminRoutes = (app: Express) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;

    app.use(`${path_admin}/categories`, categoryRoutes);

    app.use(`${path_admin}/tours`, tourRoutes);

    app.use(`${path_admin}/accounts`, accountRoutes);
}
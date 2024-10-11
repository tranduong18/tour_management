import { Express } from "express";
import { categoryRoutes } from "./category.route";

import { systemConfig } from "../../config/system";

export const adminRoutes = (app: Express) => {
    const path_admin = `/${systemConfig.prefixAdmin}`;

    app.use(`${path_admin}/categories`, categoryRoutes);
}
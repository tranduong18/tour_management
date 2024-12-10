import { Express } from "express";
import { tourRoute } from "./tour.route";
import { categoryRoute } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";
import { userRoute } from "./user.route";
import { homeRoute } from "./home.route";

import * as userMiddleware from "../../middlewares/client/user.middleware";
import * as settingMiddleware from "../../middlewares/client/setting.middleware";

export const routesClient = (app: Express) => {
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.setting);

    app.use("/", homeRoute);

    app.use("/tours", tourRoute);

    app.use("/categories", categoryRoute);

    app.use("/cart", userMiddleware.requireAuth, cartRoute);

    app.use("/order", userMiddleware.requireAuth, orderRoute);

    app.use("/user", userRoute);
}
import { Express } from "express";
import { tourRoute } from "./tour.route";
import { categoryRoute } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";
import { userRoute } from "./user.route";

import * as userMiddleware from "../../middlewares/client/user.middleware";

export const routesClient = (app: Express) => {
    app.use(userMiddleware.infoUser);

    app.use("/tours", tourRoute);

    app.use("/categories", categoryRoute);

    app.use("/cart", cartRoute);

    app.use("/order", orderRoute);

    app.use("/user", userRoute);
}
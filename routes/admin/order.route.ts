import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/order.controller";

router.get("/", controller.index);

router.patch("/changeStatus/:id", controller.changeStatus);

router.patch("/delete/:id", controller.deletePatch);

router.get("/detail/:id", controller.detail);

export const orderRoutes: Router = router;
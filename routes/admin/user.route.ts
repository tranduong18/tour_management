import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/delete/:id", controller.deletePatch);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

export const userRoutes: Router = router;
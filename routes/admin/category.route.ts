import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/category.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('image'),
    uploadCloud.uploadSingle,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id", 
    upload.single('image'),
    uploadCloud.uploadSingle,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);

router.patch("/delete/:id", controller.deletePatch);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

export const categoryRoutes: Router = router;
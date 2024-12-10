import express from "express";
import multer from "multer";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";
const userMiddleware = require("../../middlewares/client/user.middleware");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

//register
router.get("/register", controller.register);

router.post("/register", controller.registerPost);
//End register

// Auth
router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);
// End Auth

// Profile
router.get("/profile", userMiddleware.requireAuth, controller.profile);

router.get("/profile/edit", userMiddleware.requireAuth, controller.editProfile);

router.patch(
    "/profile/edit", 
    userMiddleware.requireAuth, 
    upload.single('avatar'), 
    uploadCloud.uploadSingle,
    controller.editPatch
);

router.get("/profile/changePassword", userMiddleware.requireAuth, controller.changePassword);

router.patch("/profile/changePassword", userMiddleware.requireAuth, controller.changePassPatch);
// End Profile

export const userRoute = router;
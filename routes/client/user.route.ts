import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";

//register
router.get("/register", controller.register);

router.post("/register", controller.registerPost);
//End register

// Auth
router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);
// End Auth

export const userRoute = router;
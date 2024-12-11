"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const controller = __importStar(require("../../controllers/client/user.controller"));
const userMiddleware = require("../../middlewares/client/user.middleware");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = (0, multer_1.default)();
router.get("/register", controller.register);
router.post("/register", controller.registerPost);
router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/profile", userMiddleware.requireAuth, controller.profile);
router.get("/profile/edit", userMiddleware.requireAuth, controller.editProfile);
router.patch("/profile/edit", userMiddleware.requireAuth, upload.single('avatar'), uploadCloud.uploadSingle, controller.editPatch);
router.get("/profile/changePassword", userMiddleware.requireAuth, controller.changePassword);
router.patch("/profile/changePassword", userMiddleware.requireAuth, controller.changePassPatch);
exports.userRoute = router;

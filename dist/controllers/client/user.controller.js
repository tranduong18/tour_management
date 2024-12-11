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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassPatch = exports.changePassword = exports.editPatch = exports.editProfile = exports.profile = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const generateHelper = __importStar(require("../../helpers/generate.helper"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.default.findOne({
        where: {
            email: req.body.email,
            deleted: false
        },
        raw: true
    });
    if (existUser) {
        res.redirect("back");
        return;
    }
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: (0, md5_1.default)(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
    };
    const user = yield user_model_1.default.create(userData);
    res.cookie("tokenUser", user["tokenUser"]);
    res.redirect("/categories");
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        where: {
            email: req.body.email,
            deleted: false
        },
        raw: true
    });
    if (!user) {
        res.redirect("back");
        return;
    }
    if ((0, md5_1.default)(req.body.password) != user["password"]) {
        res.redirect("back");
        return;
    }
    if (user["status"] != "active") {
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", user["tokenUser"]);
    res.redirect("/categories");
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
});
exports.logout = logout;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/profile", {
        pageTitle: "Thông tin cá nhân",
    });
});
exports.profile = profile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/editProfile", {
        pageTitle: "Sửa thông tin cá nhân",
    });
});
exports.editProfile = editProfile;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield user_model_1.default.update(req.body, {
        where: {
            id: res.locals.user.id
        }
    });
    res.redirect("back");
});
exports.editPatch = editPatch;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/change-password", {
        pageTitle: "Đổi mật khẩu"
    });
});
exports.changePassword = changePassword;
const changePassPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    yield user_model_1.default.update({
        password: (0, md5_1.default)(password)
    }, {
        where: {
            tokenUser: tokenUser
        }
    });
    res.redirect("/user/profile");
});
exports.changePassPatch = changePassPatch;

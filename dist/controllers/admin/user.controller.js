"use strict";
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
exports.detail = exports.deletePatch = exports.changeStatus = exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/users/index", {
        pageTitle: "Tài khoản user",
        records: users
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, statusChange } = req.params;
    yield user_model_1.default.update({
        status: statusChange
    }, {
        where: {
            id: id
        }
    });
    res.json({
        code: 200
    });
});
exports.changeStatus = changeStatus;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield user_model_1.default.update({
        deleted: true
    }, {
        where: {
            id: id
        }
    });
    res.json({
        code: 200
    });
});
exports.deletePatch = deletePatch;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findOne({
        where: {
            id: id
        }
    });
    res.render("admin/pages/users/detail", {
        pageTitle: "Chi tiết người dùng",
        user: user
    });
});
exports.detail = detail;

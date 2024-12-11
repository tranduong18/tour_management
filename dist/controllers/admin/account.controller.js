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
exports.detail = exports.changeStatus = exports.deletePatch = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helpers/generate.helper");
const system_1 = require("../../config/system");
const account_model_1 = __importDefault(require("../../models/account.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/accounts/index", {
        pageTitle: "Tài khoản admin",
        records: accounts
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản admin"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, md5_1.default)(req.body.password);
    req.body.token = (0, generate_helper_1.generateRandomString)(30);
    const account = yield account_model_1.default.create(req.body);
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/accounts`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const account = yield account_model_1.default.findOne({
            where: {
                id: id
            },
            raw: true
        });
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản admin",
            account: account
        });
    }
    catch (error) {
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.body.password == "") {
        delete req.body.password;
    }
    else {
        req.body.password = (0, md5_1.default)(req.body.password);
    }
    yield account_model_1.default.update(req.body, {
        where: {
            id: id,
            deleted: false
        }
    });
    res.redirect("back");
});
exports.editPatch = editPatch;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield account_model_1.default.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });
        res.json({
            code: 200
        });
    }
    catch (error) {
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.deletePatch = deletePatch;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, statusChange } = req.params;
    yield account_model_1.default.update({
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
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const account = yield account_model_1.default.findOne({
            where: {
                id: id,
                deleted: false
            }
        });
        res.render("admin/pages/accounts/detail", {
            pageTitle: "Chi tiết tài khoản",
            account: account
        });
    }
    catch (error) {
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.detail = detail;

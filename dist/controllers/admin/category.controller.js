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
const slugify_1 = __importDefault(require("slugify"));
const system_1 = require("../../config/system");
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.findAll({
        where: {
            deleted: false
        },
        raw: true
    });
    res.render("admin/pages/categories/index", {
        pageTitle: "Danh mục tour",
        categories: categories
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/categories/create", {
        pageTitle: "Thêm mới danh mục"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const countCategory = yield category_model_1.default.count();
        req.body.position = countCategory + 1;
    }
    const slug = (0, slugify_1.default)(`${req.body.title}-${Date.now()}`, {
        lower: true
    });
    const dataCategory = {
        title: req.body.title,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        image: req.body.image,
        description: req.body.description,
    };
    const category = yield category_model_1.default.create(dataCategory);
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/categories`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const category = yield category_model_1.default.findOne({
        where: {
            id: id
        },
        raw: true
    });
    res.render("admin/pages/categories/edit", {
        pageTitle: "Chỉnh sửa danh mục",
        category: category
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const countCategory = yield category_model_1.default.count();
        req.body.position = countCategory + 1;
    }
    const slug = (0, slugify_1.default)(`${req.body.title}-${Date.now()}`, {
        lower: true
    });
    const dataCategory = {
        title: req.body.title,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        description: req.body.description,
    };
    if (req.body.image) {
        dataCategory["image"] = req.body.image;
    }
    yield category_model_1.default.update(dataCategory, {
        where: {
            id: id
        }
    });
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/categories`);
});
exports.editPatch = editPatch;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield category_model_1.default.update({
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
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, statusChange } = req.params;
    yield category_model_1.default.update({
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
    const id = req.params.id;
    const category = yield category_model_1.default.findOne({
        where: {
            id: id
        },
        raw: true
    });
    res.render("admin/pages/categories/detail", {
        pageTitle: "Chi tiết danh mục",
        category: category
    });
});
exports.detail = detail;

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
exports.index = void 0;
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const category_model_1 = __importDefault(require("../../models/category.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toursNew = yield tour_model_1.default.findAll({
        where: {
            status: "active",
            deleted: false
        },
        order: [
            ['position', 'DESC']
        ],
        limit: 6,
        attributes: { exclude: ['description'] }
    });
    for (const item of toursNew) {
        if (item["images"]) {
            const arrayImage = JSON.parse(item["images"]);
            if (arrayImage.length > 0) {
                item["image"] = arrayImage[0];
            }
        }
        if (item["discount"] > 0) {
            item["price_special"] = (1 - item["discount"] / 100) * item["price"];
        }
    }
    const categoriesNew = yield category_model_1.default.findAll({
        where: {
            status: "active",
            deleted: false
        },
        order: [
            ['position', 'DESC']
        ],
        limit: 6
    });
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        toursNew: toursNew,
        categoriesNew: categoriesNew
    });
});
exports.index = index;

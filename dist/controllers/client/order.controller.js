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
exports.success = exports.index = void 0;
const order_model_1 = __importDefault(require("../../models/order.model"));
const tour_model_1 = __importDefault(require("../../models/tour.model"));
const order_item_model_1 = __importDefault(require("../../models/order-item.model"));
const moment_1 = __importDefault(require("moment"));
const generate_helper_1 = require("../../helpers/generate.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const dataOrders = {
        code: "",
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    };
    const order = yield order_model_1.default.create(dataOrders);
    const orderId = order.dataValues.id;
    const code = (0, generate_helper_1.generateOrderCode)(orderId);
    yield order_model_1.default.update({
        code: code
    }, {
        where: {
            id: orderId
        }
    });
    for (const item of data.cart) {
        const dataItem = {
            orderId: orderId,
            tourId: item.tourId,
            quantity: item.quantity
        };
        const tourInfo = yield tour_model_1.default.findOne({
            where: {
                id: item.tourId,
                deleted: false,
                status: 'active'
            },
            raw: true
        });
        dataItem["price"] = tourInfo["price"];
        dataItem["discount"] = tourInfo["discount"];
        dataItem["timeStart"] = tourInfo["timeStart"];
        yield order_item_model_1.default.create(dataItem);
    }
    res.json({
        code: 200,
        message: "Đặt hàng thành công!",
        orderCode: code
    });
});
exports.index = index;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCode = req.params.orderCode;
    const order = yield order_model_1.default.findOne({
        where: {
            code: orderCode,
            deleted: false
        },
        raw: true
    });
    order["createdAtFormat"] = (0, moment_1.default)(order["createdAt"]).format("DD/MM/YY HH:mm:ss");
    const ordersItem = yield order_item_model_1.default.findAll({
        where: {
            orderId: order["id"],
        },
        raw: true
    });
    let total = 0;
    for (const item of ordersItem) {
        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
        item["total"] = item["price_special"] * item["quantity"];
        total += item["total"];
        const tourInfo = yield tour_model_1.default.findOne({
            where: {
                id: item["tourId"]
            },
            raw: true
        });
        tourInfo["images"] = JSON.parse(tourInfo["images"]);
        item["image"] = tourInfo["images"][0];
        item["title"] = tourInfo["title"];
        item["slug"] = tourInfo["slug"];
    }
    res.render("client/pages/order/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        ordersItem: ordersItem,
        total: total
    });
});
exports.success = success;

import { Request, Response } from "express";
import Order from "../../models/order.model";
import moment from "moment";

// [GET] /admin/orders
export const index = async (req: Request, res: Response) => {
    const orders = await Order.findAll({
        where: {
            deleted: false
        }, raw: true
    });

    for(const order of orders){
        order["createdAtFormat"] = moment(order["createdAt"]).format("DD/MM/YY HH:mm:ss")
    }
    
    res.render("admin/pages/orders/index", {
        pageTitle: "Quản lý đơn hàng",
        orders: orders
    });
}

// [PATCH] /admin/orders/changeStatus/:id
export const changeStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    const newStatus = req.body.status;
    
    await Order.update({
        status: newStatus
    }, {
        where: {
            id: id
        }
    })

    res.json({
        code: 200
    });
}

// [PATCH] /admin/orders/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    await Order.update({
        deleted: true
    }, {
        where: {
            id: id
        }
    })

    res.json({
        code: 200
    });
} 


// [GET] /admin/orders/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;

    const order = await Order.findOne({
        where: {
            id: id
        }
    })

    res.render("admin/pages/orders/detail", {
        pageTitle: "Chi tiết đơn hàng",
        order: order
    });
}
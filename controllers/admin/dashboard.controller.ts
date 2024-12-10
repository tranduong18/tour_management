import { Request, Response } from "express";
import Account from "../../models/account.model";
import User from "../../models/user.model";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";

// [GET] /admin/dashboard/
export const index = async (req: Request, res: Response) => {
    const statistic = {
        category: {
            total: 0,
            active: 0,
            inactive: 0
        },
        tour: {
            total: 0,
            active: 0,
            inactive: 0,
          },
          account: {
            total: 0,
            active: 0,
            inactive: 0,
          },
          user: {
            total: 0,
            active: 0,
            inactive: 0,
          },
    };

    // Category
    statistic.category.total = await Category.count({
        where: {
            deleted: false
        }
    });

    statistic.category.active = await Category.count({
        where: {
            deleted: false,
            status: "active"
        }
    });

    statistic.category.inactive = await Category.count({
        where: {
            deleted: false,
            status: "inactive"
        }
    });
    // End Category

    // tour
    statistic.tour.total = await Tour.count({
        where: {
            deleted: false
        }
    });

    statistic.tour.active = await Tour.count({
        where: {
            deleted: false,
            status: "active"
        }
    });

    statistic.tour.inactive = await Tour.count({
        where: {
            deleted: false,
            status: "inactive"
        }
    });
    // End tour

    // Account
    statistic.account.total = await Account.count({
        where: {
            deleted: false
        }
    });

    statistic.account.active = await Account.count({
        where: {
            deleted: false,
            status: "active"
        }
    });

    statistic.account.inactive = await Account.count({
        where: {
            deleted: false,
            status: "inactive"
        }
    });
    // End Account

    // User
    statistic.user.total = await User.count({
        where: {
            deleted: false
        }
    });

    statistic.user.active = await User.count({
        where: {
            deleted: false,
            status: "active"
        }
    });

    statistic.user.inactive = await User.count({
        where: {
            deleted: false,
            status: "inactive"
        }
    });
    // End User

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}
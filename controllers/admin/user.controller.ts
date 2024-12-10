import { Request, Response } from "express";
import User from "../../models/user.model";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    const users = await User.findAll({
        where: {
            deleted: false
        },
        raw: true
    });

    res.render("admin/pages/users/index", {
        pageTitle: "Tài khoản user",
        records: users
    })
}

// [PATCH] /admin/users/change-status/:statusChange/:id
export const changeStatus = async (req: Request, res: Response) => {
    const {id, statusChange} = req.params;
        
    await User.update({
        status: statusChange
    }, {
        where: {
            id: id
        }
    });

    res.json({
        code: 200
    })
}

// [PATCH] /admin/users/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    await User.update({
        deleted: true
    }, {
        where: {
            id: id
        }
    })

    res.json({
        code: 200
    })
}


// [GET] /admin/users/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await User.findOne({
        where: {
            id: id
        }
    })

    res.render("admin/pages/users/detail", {
        pageTitle: "Chi tiết người dùng",
        user: user
    });
}
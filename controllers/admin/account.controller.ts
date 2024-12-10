import { Request, Response } from "express";
import md5 from "md5";
import { generateRandomString } from "../../helpers/generate.helper";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    const accounts = await Account.findAll({
        where: {
            deleted: false
        },
        raw: true
    });

    res.render("admin/pages/accounts/index", {
        pageTitle: "Tài khoản admin",
        records: accounts
    })
}

// [GET] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản admin"
    });
}

// [POST] /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
    req.body.password = md5(req.body.password);

    req.body.token = generateRandomString(30);

    
    const account = await Account.create(req.body);
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const account = await Account.findOne({
            where: {
                id: id
            },
            raw: true
        });
        
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản admin",
            account: account
    });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

// [PATCH] /admin/accounts/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    if(req.body.password == ""){
        delete req.body.password;
    }
    else{
        req.body.password = md5(req.body.password);    
    }

    await Account.update(req.body, {
        where: {
            id: id,
            deleted: false
        }
    });

    res.redirect("back");
}

// [PATCH] /admin/accounts/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await Account.update({
            deleted: true
        }, {
            where: {
                id: id
            }
        });

        res.json({
            code: 200
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

// [PATCH] /admin/accounts/change-status/:statusChange/:id
export const changeStatus = async (req: Request, res: Response) => {
    const {id, statusChange} = req.params;

    await Account.update({
        status: statusChange
    }, {
        where: {
            id: id
        }
    });

    res.json({
        code: 200
    });
}

// [GET] /admin/accounts/detail/:id
export const detail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
    
        const account = await Account.findOne({
            where:{
                id: id,
                deleted: false
            }
        });

        res.render("admin/pages/accounts/detail", {
            pageTitle: "Chi tiết tài khoản",
            account: account
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}
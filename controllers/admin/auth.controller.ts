import { Request, Response } from "express";
import md5 from "md5";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";

// [GET] /admin/auth/login
export const login = async (req: Request, res: Response) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
      });
}

// [POST] /admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const account = await Account.findOne({
        where: {
            email: email,
            deleted: false
        },
        raw: true
    });

    if(!account){
        res.redirect("back");
        return;
    }

    if(md5(password) != account["password"]){
        res.redirect("back");
        return;
    }

    if(account["status"] != "active"){
        res.redirect("back");
        return;
    }

    res.cookie("token", account["token"]);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}
import { Request, Response } from "express";
import md5 from "md5";
import User from "../../models/user.model";
import * as generateHelper from "../../helpers/generate.helper";

// [GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    });
}

// [POST] /user/register
export const registerPost = async (req: Request, res: Response) => {
    const existUser = await User.findOne({
        where: {
            email: req.body.email,
            deleted: false
        },
        raw: true
    });

    if(existUser){
        res.redirect("back");
        return;
    }

    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
    };

    const user = await User.create(userData);

    res.cookie("tokenUser", user["tokenUser"]);
    
    res.redirect("/categories");
}


// [GET] /user/login
export const login = async (req: Request, res: Response) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
}

// [POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
            deleted: false
        },
        raw: true
    });

    if(!user){
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) != user["password"]){
        res.redirect("back");
        return;
    }

    if(user["status"] != "active"){
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user["tokenUser"]);
    res.redirect("/categories");
}

// [GET] /user/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}

// [GET] /user/profile
export const profile = async (req: Request, res: Response) => {
    res.render("client/pages/user/profile", {
        pageTitle: "Thông tin cá nhân",
    });
}

// [GET] /user/profile/edit
export const editProfile = async (req: Request, res: Response) => {
    res.render("client/pages/user/editProfile", {
        pageTitle: "Sửa thông tin cá nhân",
    });
}

// [PATCH] /user/profile/edit
export const editPatch = async (req: Request, res: Response) => {
    console.log(req.body);
    await User.update(req.body, {
        where: {
            id: res.locals.user.id
        }
    });

    res.redirect("back");
}

// [GET] /user/profile/changePassword
export const changePassword = async (req: Request, res: Response) => {
    res.render("client/pages/user/change-password", {
        pageTitle: "Đổi mật khẩu"
    });
}

// [PATCH] /user/profile/changePassword
export const changePassPatch = async (req: Request, res: Response) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.update({
        password: md5(password)
    }, {
        where: {
            tokenUser: tokenUser
        }
    })

    res.redirect("/user/profile");
}
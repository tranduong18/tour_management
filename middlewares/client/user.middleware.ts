import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            where: {
                tokenUser: req.cookies.tokenUser,
                deleted: false
            },
            raw: true
        });

        if(user){
            res.locals.user = user;
        }
    }
    next();
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies.tokenUser){
        res.redirect("/user/login");
        return;
    }

    const user = await User.findOne({
        where: {
            tokenUser: req.cookies.tokenUser,
            deleted: false
        },
        raw: true
    });

    if(!user){
        res.redirect("/user/login");
        return;
    }

    next();
}
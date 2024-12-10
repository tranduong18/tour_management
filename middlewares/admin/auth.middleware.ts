import { NextFunction, Request, Response } from "express";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const account = await Account.findOne({
        where: {
            token: req.cookies.token,
            deleted: false
        },
        attributes: ['fullName', 'email', 'avatar', 'status']
    })

    if(!account){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    
    res.locals.account = account;
    
    next();
}


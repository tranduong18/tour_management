import { NextFunction, Request, Response } from "express";
import Setting from "../../models/setting.model";

export const setting = async (req: Request, res: Response, next: NextFunction) => {
    const setting = await Setting.findOne({});

    res.locals.setting = setting;

    next();
}

import { Request, Response } from "express";
import Setting from "../../models/setting.model";

// [GET] /admin/settings/general
export const general = async (req: Request, res: Response) => {
    const setting = await Setting.findOne({});

    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        setting: setting
    });
}

// [PATCH] /admin/settings/general
export const generalPatch = async (req: Request, res: Response) => {
    const setting = await Setting.findOne({});

    console.log(req.body);

    if(setting){
        await Setting.update(req.body, {
            where: {
                id: setting["id"]
            }
        });
    }
    else{
        const record = await Setting.create(req.body);
    }

    res.redirect("back");
}
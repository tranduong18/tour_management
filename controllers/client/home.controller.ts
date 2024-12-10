import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";

// [GET] /
export const index = async (req: Request, res: Response) => {
    const toursNew = await Tour.findAll({
        where: {
            status: "active",
            deleted: false
        },
        order: [
            ['position', 'DESC']
        ],
        limit: 6,
        attributes: { exclude: ['description'] }  
    });

    for(const item of toursNew){
        if(item["images"]){
            const arrayImage = JSON.parse(item["images"]);
            if(arrayImage.length > 0){
                item["image"] = arrayImage[0];
            }
        }

        if(item["discount"] > 0){
            item["price_special"] = (1 - item["discount"]/100) * item["price"];
        }
    }

    const categoriesNew = await Category.findAll({
        where: {
            status: "active",
            deleted: false
        },
        order: [
            ['position', 'DESC']
        ],
        limit: 6
    });

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        toursNew: toursNew,
        categoriesNew: categoriesNew
    });
}

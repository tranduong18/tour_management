import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import TourCategory from "../../models/tour-category.model";
import slugify from "slugify";
import { systemConfig } from "../../config/system";
import { generateTourCode } from "../../helpers/generate.helper";

// [GET] /admin/tours/
export const index = async (req: Request, res: Response) => {
    // SELECT * FROM tours WHERE deleted = false;
    const tours = await Tour.findAll({
        where: {
            deleted: false
        },
        raw: true
    });

    tours.forEach(item => {
        if(item["images"]){
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }

        item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    })

    res.render("admin/pages/tours/index", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
}

// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
    // SELECT * FROM categories WHERE deleted = false AND status = "active"
    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true
    });

    res.render("admin/pages/tours/create", {
        pageTitle: "Thêm mới tour",
        categories: categories
    })
}

// [POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countTour = await Tour.count();
        req.body.position = countTour + 1;
    }

    const slug = slugify(`${req.body.title}-${Date.now()}`, {
        lower: true
    });

    const dataTour = {
        title: req.body.title,
        code: "",
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        images: JSON.stringify(req.body.images),
        information: req.body.information,
        schedule: req.body.schedule
    };

    const tour = await Tour.create(dataTour);
    const tourId = tour.dataValues.id;
    const code = generateTourCode(tourId);

    await Tour.update({
        code: code
    }, {
        where: {
            id: tourId
        }
    });

    const dataTourCategory = {
        tour_id: tourId,
        category_id: parseInt(req.body.category_id)
    }

    await TourCategory.create(dataTourCategory);

    res.redirect(`/${systemConfig.prefixAdmin}/tours`);
}

// [GET] /admin/tours/edit/:id
export const edit = async (req: Request, res: Response) => {
    const idTour = req.params.id;

    const tour = await Tour.findOne({
        where: {
            id: idTour
        },
        raw: true
    });

    const formattedTimeStart = tour["timeStart"] ? tour["timeStart"].toISOString().slice(0, 16) : '';
    tour["formattedTimeStart"] = formattedTimeStart;


    const tourCategory = await TourCategory.findOne({
        where: {
            tour_id: idTour
        },
        raw: true
    });

    const category = await Category.findOne({
        where: {
            id: tourCategory["category_id"],
            deleted: false,
            status: "active"
        },
        raw: true
    })

    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true
    });

    res.render("admin/pages/tours/edit", {
        pageTitle: "Chỉnh sửa tour",
        categories: categories,
        tour: tour,
        category: category
    })
}

// [PATCH] /admin/tours/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const tourId = req.params.id;

    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countTour = await Tour.count();
        req.body.position = countTour + 1;
    }

    const slug = slugify(`${req.body.title}-${Date.now()}`, {
        lower: true
    });

    const dataTour = {
        title: req.body.title,
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        information: req.body.information,
        schedule: req.body.schedule
    };

    if(req.body.images){
        dataTour["images"] = JSON.stringify(req.body.images);
    }

    await Tour.update(dataTour, {
        where: {
            id: tourId
        }
    });

    if(req.body.category_id){
        await TourCategory.update({
            category_id: parseInt(req.body.category_id)
        }, {
            where: {
                tour_id: tourId
            }
        })
    }

    res.redirect(`/${systemConfig.prefixAdmin}/tours`);
}

// [PATCH] /admin/tours/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
    const idTour = req.params.id;

    await Tour.update({
        deleted: true
    }, {
        where: {
            id: idTour
        }
    });

    res.json({
        code: 200
    })
}

// [PATCH] /admin/tours/change-status/:statusChange/:id
export const changeStatus = async (req: Request, res: Response) => {
    const { id, statusChange } = req.params;

    await Tour.update({
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
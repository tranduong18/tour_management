import { Request, Response } from "express";
import slugify from "slugify";
import { systemConfig } from "../../config/system";
import Category from "../../models/category.model";

// [GET] /admin/categories
export const index = async (req: Request, res: Response) => {
    // SELECT * FROM categories WHERE deleted = false;
    const categories = await Category.findAll({
        where: {
            deleted: false
        },
        raw: true
    });

    res.render("admin/pages/categories/index", {
        pageTitle: "Danh mục tour",
        categories: categories
    })
}

// [GET] /admin/categories/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/categories/create", {
        pageTitle: "Thêm mới danh mục"
    })
}


// [POST] /admin/categories/create
export const createPost = async (req: Request, res: Response) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countCategory = await Category.count();
        req.body.position = countCategory + 1;
    }

    const slug = slugify(`${req.body.title}-${Date.now()}`, {
        lower: true
    });

    const dataCategory = {
        title: req.body.title,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        image: req.body.image,
        description: req.body.description,
    };

    const category = await Category.create(dataCategory);

    res.redirect(`/${systemConfig.prefixAdmin}/categories`);
}

// [GET] /admin/categories/edit
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;

    const category = await Category.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render("admin/pages/categories/edit", {
        pageTitle: "Chỉnh sửa danh mục",
        category: category
    })
}


// [PATCH] /admin/categories/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countCategory = await Category.count();
        req.body.position = countCategory + 1;
    }

    const slug = slugify(`${req.body.title}-${Date.now()}`, {
        lower: true
    });

    const dataCategory = {
        title: req.body.title,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        description: req.body.description,
    };

    if(req.body.image){
        dataCategory["image"] = req.body.image;
    }

    await Category.update(dataCategory, {
        where: {
            id: id
        }
    });

    res.redirect(`/${systemConfig.prefixAdmin}/categories`);
}

// [PATCH] /admin/categories/delete/:id
export const deletePatch = async (req: Request, res: Response) => {
    const id = req.params.id;

    await Category.update({
        deleted: true
    }, {
        where: {
            id: id
        }
    });

    res.json({
        code: 200
    })
}

// [PATCH] /admin/categories/change-status/:statusChange/:id
export const changeStatus = async (req: Request, res: Response) => {
    const { id, statusChange } = req.params;

    await Category.update({
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

// [GET] /admin/categories/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;

    const category = await Category.findOne({
        where: {
            id: id
        },
        raw: true
    });

    res.render("admin/pages/categories/detail", {
        pageTitle: "Chi tiết danh mục",
        category: category
    })
}
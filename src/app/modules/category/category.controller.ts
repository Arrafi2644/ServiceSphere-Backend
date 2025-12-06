import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await CategoryServices.createCategoryService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Category Created Successfully",
        data: category
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await CategoryServices.updateCategoryService(id, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category Updated Successfully",
        data: result,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CategoryServices.deleteCategoryService(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category deleted successfully",
        data: result,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryServices.getAllCategoryService();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All categories retrieved successfully",
        data: result,
    });
});


export const CategoryControllers = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}


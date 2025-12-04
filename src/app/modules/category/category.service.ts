import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { ICategory } from "../category/category.interface";
import { Category } from "../category/category.model";


export const createCategoryService = async (payload: ICategory) => {
    const existingCategory = await Category.findOne({ name: payload.name });

    if (existingCategory) {
        throw new Error("Category already exists.");
    }

    return await Category.create(payload);
};

export const updateCategoryService = async (id: string, payload: Partial<ICategory>) => {
    // Check if category exists
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
        throw new AppError(httpStatus.NOT_FOUND, "Category not found.");
    }

    // Update & return result
    const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedCategory;
};


export const CategoryServices = {
    createCategoryService,
    updateCategoryService
}
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { ICategory } from "../category/category.interface";
import { Category } from "../category/category.model";
import mongoose from 'mongoose';


 const createCategoryService = async (payload: ICategory) => {
    const existingCategory = await Category.findOne({ name: payload.name });

    if (existingCategory) {
        throw new Error("Category already exists.");
    }

    return await Category.create(payload);
};

const updateCategoryService = async (id: string, payload: Partial<ICategory>) => {
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

 const deleteCategoryService = async (id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check existing category
        const existingCategory = await Category.findById(id).session(session);
        if (!existingCategory) {
            throw new AppError(httpStatus.NOT_FOUND, "Category not found.");
        }

        // ❗ যদি এই category এর সাথে services সম্পর্কিত থাকে → delete
        // await Service.deleteMany({ category: id }).session(session);

        // Delete Category
        await Category.findByIdAndDelete(id).session(session);

        // Commit
        await session.commitTransaction();
        session.endSession();

        return { message: "Category deleted successfully" };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

 const getAllCategoryService = async () => {
    const categories = await Category.find();
    return categories;
};


export const CategoryServices = {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getAllCategoryService
}
import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createCategoryZodSchema, updateCategoryZodSchema } from "./category.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post('/', validateRequest(createCategoryZodSchema), checkAuth(Role.ADMIN), CategoryControllers.createCategory)
router.patch('/:id', validateRequest(updateCategoryZodSchema), checkAuth(Role.ADMIN), CategoryControllers.updateCategory)
router.delete('/:id', checkAuth(Role.ADMIN), CategoryControllers.deleteCategory)
router.get("/", CategoryControllers.getAllCategories)

export const categoryRoutes = router;


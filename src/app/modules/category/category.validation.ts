import { z } from "zod";

// Create Category Validation
export const createCategoryZodSchema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, "Name cannot be empty"),
    description: z
      .string()
      .optional(),
    icon: z
      .string()
      .optional(),
    isActive: z
      .boolean()
      .optional(),
  })

// Update Category Validation
export const updateCategoryZodSchema = z.object({
    name: z
      .string()
      .optional(),
    description: z
      .string()
      .optional(),
    icon: z
      .string()
      .optional(),
    isActive: z
      .boolean()
      .optional(),
  })


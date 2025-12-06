import { z } from "zod";

// MongoDB ObjectId Validate Regex
const objectIdValidation = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: "Invalid MongoDB ObjectId format",
});

export const createServiceZodSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description cannot be empty"),

  price: z
    .number({ required_error: "Price is required" })
    .min(0, "Price cannot be negative"),

  image: z
    .string({ required_error: "Image URL is required" })
    .min(1, "Image URL cannot be empty"),

  isActive: z.boolean().optional(),

  category: objectIdValidation,

  serviceProvider: objectIdValidation,
});
  export const updateServiceZodSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),

  description: z.string().min(1, "Description cannot be empty").optional(),

  price: z.number().min(0, "Price cannot be negative").optional(),

  image: z.string().min(1, "Image URL cannot be empty").optional(),

  isActive: z.boolean().optional(),

  category: objectIdValidation.optional(),

  serviceProvider: objectIdValidation.optional(),
});

import { z } from "zod";
import { Role, IsActive } from "./user.interface";
import { VerificationStatus } from "./user.interface";


export const createUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be a string" }).min(1, { message: "Name is required" }),
    email: z.string({ invalid_type_error: "Email must be a string" }).email({ message: "Invalid email address" }),
    password: z.string({ invalid_type_error: "Password must be a string" }).min(8, { message: "Password must be at least 8 characters long" }),
    phone: z.string({ invalid_type_error: "Phone must be a string" }).optional(),
    picture: z.string({ invalid_type_error: "Picture must be a string" }).optional(),
    address: z.string({ invalid_type_error: "Address must be a string" }).optional(),
    role: z
        .enum([Role.ADMIN, Role.USER, Role.PROVIDER], {
            invalid_type_error: "Role must be either ADMIN or USER OR PROVIDER",
        }).optional(),
    isVerified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
});


export const updateUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be a string" }).optional(),
    email: z.string({ invalid_type_error: "Email must be a string" }).email({ message: "Invalid email address" }).optional(),
    phone: z.string({ invalid_type_error: "Phone must be a string" }).optional(),
    picture: z.string({ invalid_type_error: "Picture must be a string" }).optional(),
    address: z.string({ invalid_type_error: "Address must be a string" }).optional(),
    role: z.enum([Role.ADMIN, Role.USER, Role.PROVIDER], {
        invalid_type_error: "Role must be either ADMIN or USER OR PROVIDER",
    }).optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    isDeleted: z
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),
    isVerified: z
        .boolean({ invalid_type_error: "isVerified must be true or false" })
        .optional(),
});



export const createProviderRequestZodSchema = z.object({
    skills: z.array(z.string({ invalid_type_error: "Skill must be a string" })).min(1, { message: "At least one skill is required" }),
    bio: z.string({ invalid_type_error: "Bio must be a string" }).min(1, { message: "Bio is required" }),
    experience: z.number({ invalid_type_error: "Experience must be a number" }).min(0, { message: "Experience must be at least 0" }),
    documents: z.object({
        nidFront: z.string({ invalid_type_error: "NID Front must be a string" }).min(1, { message: "NID Front is required" }),
        nidBack: z.string({ invalid_type_error: "NID Back must be a string" }).min(1, { message: "NID Back is required" }),
        certificate: z.string({ invalid_type_error: "Certificate must be a string" }).optional()
    }),
    gigs: z.array(
        z.object({
            title: z.string({ invalid_type_error: "Title must be a string" }).min(1),
            description: z.string({ invalid_type_error: "Description must be a string" }).min(1),
            price: z.number({ invalid_type_error: "Price must be a number" }),
            image: z.string({ invalid_type_error: "Image must be a string" }),
            category: z.string({ invalid_type_error: "Category must be a string" }),
            isActive: z.boolean().optional()
        })
    ).optional()
});

export const updateProviderRequestStatusZodSchema = z.object({
    status: z.enum([VerificationStatus.APPROVED, VerificationStatus.REJECTED], {
        invalid_type_error: "Status must be APPROVED or REJECTED"
    })
});
